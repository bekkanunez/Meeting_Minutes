import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEETING } from '../../utils/mutations';
import { QUERY_MEETINGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const MeetingForm = () => {
  const [meetingText, setMeetingText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addMeeting, { error }] = useMutation(ADD_MEETING, {
    update(cache, { data: { addMeeting } }) {
      try {
        const { meetings } = cache.readQuery({ query: QUERY_MEETINGS });

        cache.writeQuery({
          query: QUERY_MEETINGS,
          data: { meetings: [addMeeting, ...meetings] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, meetings: [...me.meetings, addMeeting] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMeeting({
        variables: {
          meetingText,
          meetingHost: Auth.getProfile().data.username,
        },
      });

      setMeetingText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'meetingText' && value.length <= 280) {
      setMeetingText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Would you like to create a new meeting?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center py-2"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="meetingHost"
                type="text"
                placeholder="Who will host the meeting?"
                className="form-input w-100"
                style={{ lineHeight: '.8', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
              <input
                name="department"
                type="text"
                placeholder="What department?"
                className="form-input w-100"
                style={{ lineHeight: '.8', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
              <input
                name="title"
                type="text"
                placeholder="What is the subject meeting title?"
                className="form-input w-100"
                style={{ lineHeight: '.8', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
            <input
                name="date"
                type="datetime-local"
                placeholder="What is the meeting date?"
                className="form-input w-100"
                style={{ lineHeight: '.8', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="meetingText"
                placeholder="Brief description..."
                value={meetingText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <p
              className={`mx-5 mt-2 ${characterCount === 280 || error ? 'text-danger' : ''
                }`}
            >
              Character Count: {characterCount}/280
            </p>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Meeting
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post and view meetings. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MeetingForm;
