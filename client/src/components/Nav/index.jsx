import Auth from '../../utils/auth';
import './nav.css'
import LoginButton from './loginButton'
import MenuBar from './menuBar';

const Nav = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav>
      <div className='header_flex'>
      <h1 className='header_1_style'>
        SocialSync
      </h1> 
    <LoginButton/>
    </div>
      <MenuBar />
    </nav>
  )
};

export default Nav;
