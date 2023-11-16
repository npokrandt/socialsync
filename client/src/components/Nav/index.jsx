import Auth from '../../utils/auth';
import './nav.css'
import { LoginButton, SignInButton } from './navButtons';
import MenuBar from './menuBar';

const Nav = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav>
      <div className='header_flex'>
        <h1>
          SocialSync
        </h1>
        <div>
          <LoginButton />
          <SignInButton />
        </div>
      </div>
      <MenuBar />
    </nav>
  )
};

export default Nav;
