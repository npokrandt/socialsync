import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";

export const LoginButton = () => {
  const loggedIn = AuthService.loggedIn()
  return (
    <button onClick={() => {if(loggedIn) AuthService.logout()}}>
      {loggedIn ? "Log out" : <Link to="/login">Log in</Link>}
    </button>
  )
};

export const SignInButton = () => {
  const user = AuthService.getProfile()?.data
  return (
    <>
    {!user && <button>
      <Link to="/signup">sign up</Link>
  
    </button>}
    </>
  )
  
  }
  