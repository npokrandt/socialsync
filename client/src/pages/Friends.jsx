import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_USER, } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import "./pages.css";
import Header from "../components/Header";

const Friends = () => {

  const getFriends = (userId) => {
    const { loading, data } = useQuery(QUERY_USER, {
      variables: {
        userId,
      },
      skip: !userId,
    });
    return data?.user?.friends || [];
  }

  const getOthers = () => {
    const { loading, data } = useQuery(QUERY_USERS)

    const others = data?.users || []
    return others
  }

  const userId = AuthService.getProfile()?.data?._id;
  const friends = getFriends(userId)
  const others = getOthers()
  const [addFriendM] = useMutation(ADD_FRIEND)

  const addFriend = async (e) => {
    const friendId = e.target.name
    
    try {
      await addFriendM({
        variables: {userId, friendId}
      });

    } catch (err) {
      console.error(err);
    }
    //console.log(e.target.name)
  }  

  return (
    <main>
      <Header>Friends</Header>
      {!userId && (
        <p>
          Please <Link className="lbtn" to="/login">log in</Link> or <Link className="lbtn" to="/signup">sign up</Link> to see your friends list.
        </p>
      )}
      {friends.length == 0 && userId && <p>Seems pretty lonely around here...</p>}
      <ul>
        {friends.map((friend) => (
          <Link to={`/users/${friend._id}`}><li key={Math.random()} >{friend.username}</li></Link>
        ))}
      </ul>
      <Header>Add More Friends</Header>
      <ul>
      {others.map((other) => (
        <>
          <li key={Math.random()} >{other.username}</li><button className="btn" name={other._id} onClick={addFriend}>Add Friend</button>
        </>
        ))}
      </ul>
    </main>
  );
};

export default Friends;
