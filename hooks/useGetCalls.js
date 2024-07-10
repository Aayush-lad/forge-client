
import { useEffect, useState } from 'react';
import {useUser} from '../context/UserContext';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { userinfo } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = userinfo;


  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?._id) return;
      console.log("client user ok")
      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user._id },
              { members: { $in: [user._id] } },
            ],
          },
        });
        console.log(calls);
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?._id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })

  const upcomingCalls = calls?.filter(({ state: { startsAt } }) => {
    return startsAt && new Date(startsAt) > now
  })


  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
};