import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_EXISTING_EVENT } from '../utils/mutations';

import Header from '../components/Header';
import Calender from '../components/Calender';
import Auth from '../utils/auth';

const Profile = () => {
  const loggedUserId = Auth.getProfile()?.data?._id;
  const {userId} = useParams()
  const {data} = useQuery(QUERY_USER, {
    variables: {userId}
  })

  const [addEvent] = useMutation(ADD_EXISTING_EVENT)

  const mappedEvents = data?.user?.events?.map(({ _id, startTime, endTime, eventName }) => {
    return {
   
        event_id: _id,
        title: eventName,
        start: new Date(startTime),
        end: new Date(endTime),
      
    }

  }) || []

  const addFriendEvent = async (e) => {

    try {
      await addEvent({
        variables: {
          userId,
          eventId: e.target.name
        }
      })
      e.target.innerText = 'Event added!'
    } catch (err){
      console.log(err)
    }
  }

  return (
    <div>
      <Header>{data?.user?.username || ""}</Header>

      <div>
        <img className='profile' src='https://placehold.co/250x250' />
      </div>
      {loggedUserId !== userId ? <div>
        {mappedEvents.map((event) => (
          <>
            <li key={Math.random()} >{event.title}</li><button className="btn" name={event.event_id} onClick={addFriendEvent}>Add Event to your calendar</button>
          </>
        ))}
      </div> : null}
      <div>
       <Calender events = {mappedEvents} />
      </div>

    </div>
  );
};


export default Profile;
