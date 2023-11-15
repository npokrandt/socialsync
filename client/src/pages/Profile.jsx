import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Header from '../components/Header';
import Calender from '../components/Calender';
import Auth from '../utils/auth';

const Profile = () => {
  const userId = Auth.getProfile()?.data?._id
  console.log(userId)

  const {loading, error, data} = useQuery(QUERY_USER, {
    variables: {userId}
  })
  console.log(data)

  return (
    <div>
      <Header>{data?.user?.username || ""}</Header>

      <div>
        <img className='profile' src='https://placehold.co/250x250' />
      </div>
      <div>
       <Calender />
      </div>

    </div>
  );
};


export default Profile;
