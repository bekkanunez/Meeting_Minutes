import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_MEETING } from '../utils/queries';

const SingleMeeting = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { meetingId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MEETING, {
    // pass URL parameter
    variables: { meetingId: meetingId },
  });

  const meeting = data?.meeting || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {meeting.meetingHost} <br />
        <span style={{ fontSize: '1rem' }}>
          had this meeting on {meeting.meetingDate}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {meeting.meetingText}
        </blockquote>
      </div>
    </div>
  );
};

export default SingleMeeting;
