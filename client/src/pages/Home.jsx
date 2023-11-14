import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries';

import Header from '../components/Header';

const Home = (props) => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <>
    <main>
    <Header>Home Page</Header>
    <div>
      <img src='https://placehold.co/250x250'/>
      
    </div>
    </main>
    </>
    
  );
};

export default Home;
