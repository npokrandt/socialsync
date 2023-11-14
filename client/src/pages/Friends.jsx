import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER_FRIENDS } from "../utils/queries";

import Header from "../components/Header";
console.log();

const Friends = (props) => {
  const userID = AuthService.getProfile()?.data?._id;
  const { loading, data } = useQuery(QUERY_USER_FRIENDS, {
    variables: {
      userID,
    },
    skip: !userID,
  });
  const friends = data?.friends || [];

  return (
    <>
      <main>
        <Header>Friends Page</Header>
        {!userID && (
          <p>
            Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to see your friends list.
          </p>
        )}
        {!friends && <p>Seems pretty lonely around here...</p>}
        <ul>
          {friends.map((friend) => (
            <li>{friend.username}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Friends;
