import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Header from '../components/Header';
import Calender from '../components/Calender';
import Auth from '../utils/auth';

const Profile = () => {
  const {userId} = useParams()
  const {data} = useQuery(QUERY_USER, {
    variables: {userId}
  })

  const mappedEvents = data?.user?.events?.map(({ _id, startTime, endTime, eventName }) => {
    return {
   
        event_id: _id,
        title: eventName,
        start: new Date(startTime),
        end: new Date(endTime),
      
    }

  }) || []

  return (
    <div>
      <Header>{data?.user?.username || ""}</Header>

      <div>
        <img className='profile' src='https://placehold.co/250x250' />
      </div>
      <div>
       <Calender events = {mappedEvents} />
      </div>

    </div>
  );
};


export default Profile;
