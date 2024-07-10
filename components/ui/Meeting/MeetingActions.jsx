"use client";

import { useState ,useRef, forwardRef} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MeetCard from './MeetCard';
import MeetingModal from './MeetingModal';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@/lib/context/UserContext';
import Loader from '../Loader';
import { Textarea } from '../textarea';
import { toast } from "react-toastify";
import { Input } from '../input';
import axios from 'axios';

const initialValues = {
  dateTime: new Date().toISOString().slice(0, 16),
  description: '',
  link: '',
};




const createMeetingRequest = async ({ client, values, user }) => {
  const id = crypto.randomUUID();
  const call = client.call("default", id);
  if (!call) throw new Error("Failed to create meeting");


  const startsAt = new Date(values.dateTime).toISOString();
  const description = values.description || "Instant Meeting";

  await call.getOrCreate({
    data: {
      starts_at: startsAt,
      custom: {
        description,
      },
    },
  });

  return call;
};

const addMeetingRequest = async ({ callDetail, values, user, organizationId }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/meeting/add-meeting`,
    {
      startsAt: values.dateTime,
      description: values.description,
      callId: callDetail.id,
      participants: [user._id],
      organizationId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const MeetingTypeList = forwardRef((props,recordingRef) => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState(null); // Initialize with null instead of undefined
  const client = useStreamVideoClient();
  const { userinfo } = useUser();
  const { organizationId } = useParams();
  const user = userinfo;
  const queryClient = useQueryClient();



const handleRecordingClick = () => {
  if (recordingRef.current) {
    recordingRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

  const createMeetingMutation = useMutation({
    mutationFn: createMeetingRequest,
    onSuccess: (call) => {
      setCallDetail(call);
      toast.success("Meeting Created");
      if (meetingState === 'isInstantMeeting') {
        router.push(`/organization/${organizationId}/meeting/${call.id}`);
      } else {
        setMeetingState('isScheduleMeetingnext');
      }
    },
    onError: (error) => {
      console.error("Failed to create meeting:", error);
      toast.error("Failed to create Meeting");
    },
  });

  const addMeetingMutation = useMutation({
    mutationFn: addMeetingRequest,
    onSuccess: () => {
      toast.success("Meeting Scheduled");
      setMeetingState("isScheduleMeetingnext");
      setValues(initialValues);
      queryClient.invalidateQueries(['calls']); // Invalidate calls query to refresh data
    },
    onError: (error) => {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule Meeting");
    },
  });

  const createMeeting = async () => {
    if (!client || !user) return;
    if (!values.dateTime) {
      toast.error("Please select a date and time");
      return;
    }
    createMeetingMutation.mutate({ client, values, user });
  };

  const handleScheduleMeeting = async () => {
    await createMeeting();
    if (!callDetail) {
      console.error('Call detail is undefined');
      return;
    }
    addMeetingMutation.mutate({ callDetail, values, user, organizationId });
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 mt-2 mx-2 flex-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetCard
        img="https://img.icons8.com/?size=100&id=6697&format=png&color=FFFFFF"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-green-400"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <MeetCard
        img="https://img.icons8.com/?size=100&id=nIIlw37EbWRh&format=png&color=FFFFFF"
        title="Join Meeting"
        description="via invitation link"
        className="bg-orange-400 flex-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <MeetCard
        img="https://img.icons8.com/?size=100&id=48546&format=png&color=FFFFFF"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-400 flex-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <MeetCard
        img="https://img.icons8.com/?size=100&id=57335&format=png&color=FFFFFF"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-400 flex-1"
        handleClick={() => handleRecordingClick()}
      />

      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={handleScheduleMeeting}
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base font-normal leading-[22.4px] text-sky-2">
            Add a description
          </label>
          <Textarea
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setValues({ ...values, description: e.target.value })}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-base font-normal leading-[22.4px] text-sky-2">
            Select Date and Time
          </label>
          <input
            type='datetime-local'
            className='p-2'
            value={values.dateTime}
            onChange={(e) => setValues({ ...values, dateTime: e.target.value })}
          />
        </div>
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isScheduleMeetingnext'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Scheduled"
        handleClick={async () => {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(meetingLink);
            toast.success('Link Copied');
          } else {
            console.error('Clipboard API not supported');
            toast.error('Failed to copy link');
          }
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center"
        buttonText="Copy Meeting Link"
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
});

MeetingTypeList.displayName = 'MeetingTypeList';

export default MeetingTypeList;
