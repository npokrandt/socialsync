import React, { useState } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";

const MenuBar = () => {
  const [current, setCurrent] = useState("Profile");
  
  const items = [
    {
      label: <NavLink to="/">Home</NavLink>,
    },
    
    {
      label: <NavLink to="/friends">Friends</NavLink>,
    },
  ];
  
  const loggedInUserId = Auth.getProfile()?.data?._id;
  if (loggedInUserId) {
    items.push({ label: <NavLink to={`/users/${loggedInUserId}`}>Profile</NavLink> });
  }

  const menuStyle = {
    backgroundColor: "rgb(107, 18, 129, 0.527)",
  };

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={menuStyle}
    />
  )
};

export default MenuBar;
