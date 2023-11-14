import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import Header from "../components/Header";

const Friends = () => {
  const userId = AuthService.getProfile()?.data?._id;
  const { loading, data } = useQuery(QUERY_USER, {
    variables: {
      userId,
    },
    skip: !userId,
  });
  const friends = data?.user?.friends || [];

  return (
    <main>
      <Header>Friends Page</Header>
      {!userId && (
        <p>
          Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to see your friends list.
        </p>
      )}
      {friends.length == 0 && userId && <p>Seems pretty lonely around here...</p>}
      <ul>
        {friends.map((friend) => (
          <li key={Math.random()}>{friend.username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Friends;
