
import { Link } from 'react-router-dom'
import AuthService from "../../utils/auth";

const LoginButton = () => { 
    
    const user = AuthService.getProfile()?.data
    //console.log(user)

    const logoutHandler = () => {
      if (user){
        AuthService.logout()
      }
    }
    return (
      
      <button onClick={logoutHandler}>{user && "Log out"}{!user && <Link to='/login'>Login</Link>} </button>
    )
    
} 

export default LoginButton