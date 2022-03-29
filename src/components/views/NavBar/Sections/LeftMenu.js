import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user);
  return (
    (user.userData && user.userData.isAuth)
    ?
    <Menu mode={props.mode}>
    <Menu.Item key="left">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
    </Menu.Item>
    </Menu>
    :
    <Menu mode={props.mode}>
    <Menu.Item key="left">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="favorite">
        
    </Menu.Item>
    </Menu>
  )
}

export default LeftMenu