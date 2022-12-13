import React from 'react';
import { useQuery } from '@apollo/client';
import { Eventcalendar } from '@mobiscroll/react-lite';
import MeetingList from '../components/MeetingList';
import MeetingForm from '../components/MeetingForm';

import { QUERY_MEETINGS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_MEETINGS);
  const meetings = data?.meetings
    || [];

  return (
    <main>
      <div className="flex-row g-5">
        <div className="justify-center col-6 col-md-6 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <MeetingForm />
          </div>
        <div className="justify-center col-6 col-md-6 p-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <MeetingList
                meetings={meetings}
                title="Upcoming meetings..."
              />
            )}
          </div>
      </div>
    </main>
  );
};

export default Home;
