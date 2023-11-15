import React, { useState } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Auth from '../../utils/auth';

const MenuBar = () => {

  const loggedInUserId = Auth.getProfile()?.data?._id

  const items = [
    {
      label: <NavLink to="/">Home</NavLink>,
    },

    {
      label: <NavLink to="/friends">Friends</NavLink>,
    },
  ];

  if (loggedInUserId) {
    items.push({ label: <NavLink to={`/users/${loggedInUserId}`}>Profile</NavLink> })

  }

  const [current, setCurrent] = useState('Profile');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const menuStyle = {
    backgroundColor: 'rgb(107, 18, 129, 0.527)',
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={menuStyle}
    />
  );
};

export default MenuBar;
