import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_PROFILE } from '../utils/queries';

import Header from '../components/Header';
import Calender from '../components/Calender';

const Profile = () => {

  return (
    <div>
      <Header>Profile Page</Header>

      <div>
        <img src='https://placehold.co/250x250' />
      </div>
      <div>
       <Calender />
      </div>

    </div>
  );
};

export default Profile;
