import React, { useState, useEffect, forwardRef } from 'react';
import { useStreamVideoClient ,CallRecordingList} from '@stream-io/video-react-sdk';
import { toast } from 'react-toastify';
import Loader from '../Loader';

const RecordingsList = forwardRef((props,ref) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
    
        const callsResponse = await client.queryCalls()
        console.log(callsResponse.calls);
          const allCalls = callsResponse.calls;
          const allRecordings = [];
          let i = 0;
          for (const call of allCalls) {

            if(i==11) break;

            i++;
          
            const recordingsResponse = await call.queryRecordings();
              const callRecordings = recordingsResponse.recordings;
              allRecordings.push(...callRecordings);
            
          }

          console.log(allRecordings);

          setRecordings(allRecordings);
    
      } catch (error) {
        console.error('Error fetching recordings:', error);
        toast.error('Failed to fetch recordings');
      } finally {
        setLoading(false);
      }
    };

    if (client) {
      fetchRecordings();
    }
  }, [client]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center" ref={ref} id="recording">Meeting Recordings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((recording) => (
          <div key={recording.id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="card-body">
           
              <p className="text-gray-700 mb-4">Meeting ID: {recording.filename.substr(11,36)}</p>
              <p className="text-gray-700 mb-4">Recorded at: {new Date(recording.start_time).toLocaleString()}</p>
              <p className="text-gray-700 mb-4">
  Duration: {(new Date(recording.end_time).getTime() - new Date(recording.start_time).getTime()) / 60000} minutes
</p>

              <a
                href={recording.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                View Recording
              </a>
            </div>
          </div>
          
        ))}
      </div>
   
    </div>
  );
});

export default RecordingsList;
