import React from 'react';
import { Link } from 'react-router-dom';

const MeetingList = ({
  meetings,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!meetings.length) {
    return <h3>No Meetings Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {meetings &&
        meetings.map((meeting) => (
          <div key={meeting._id} className="card mb-3">
            <h4 className="card-header text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${meeting.meetingHost}`}
                >
                  {meeting.meetingHost} <br />
                  <span style={{ fontSize: '1rem' }}>
                    scheduled this meeting for {meeting.meetingDate}
                  </span>
                </Link>
              ) : (
                <div>
                  <span style={{ fontSize: '1rem' }}>
                    You had this meeting on {meeting.meetingDate}
                  </span>
                </div>
              )}
            </h4>
            <div className="card-body p-2">
              <p>{meeting.meetingText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MeetingList;
