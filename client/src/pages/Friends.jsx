import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries';

import Header from '../components/Header';

const Friends = (props) => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <>
    <main>
    <Header>Friends Page</Header>
    </main>
    </>
  );
};

export default Friends;


