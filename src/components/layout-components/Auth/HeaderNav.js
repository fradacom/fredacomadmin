import React from "react";
import { Layout } from "antd";
import Logo from './Logo';

const { Header } = Layout;

export const HeaderNav = props => {
  const { isMobile } = props;

  return (
    <Header className='app-header' style={{ height:'53px' }}>
      <div className={`container ${isMobile ? 'w-100' : ''}`}>
        <div className="nav">
        <Logo/>
        
        </div>
      </div>
    </Header>
  )
}

export default HeaderNav;