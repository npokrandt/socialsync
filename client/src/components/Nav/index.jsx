import Auth from '../../utils/auth';
import './nav.css'

import MenuBar from './menuBar';

const Nav = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav>
      <h1 className='header_1_style'>
        SocialSync
      </h1> 
      <MenuBar />
    </nav>
  )
};

export default Nav;
