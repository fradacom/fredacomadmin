import React from 'react'
import { Menu } from 'antd';
import { 
  AppstoreFilled,
  RiseOutlined,
} from '@ant-design/icons';
import Flex from "components/shared-components/Flex";
import { NavLink } from 'react-router-dom';
import { STEP_PREFIX_PATH, DASHBOARD_PREFIX_PATH, ROLES } from 'configs/AppConfig'
import { connect } from "react-redux";
import { signOut } from 'redux/actions/Auth';


const MobileMenu = (props) => {
  const { navCollapsed, headerNavColor, authUser, isMobile, currentTheme, signOut } = props;
	return (
    <Menu
        defaultSelectedKeys={['sub1']}
        defaultOpenKeys={['sub3']}
        mode="inline"
        style={{
            paddingLeft: 0
        }}
    >
        <Menu.Item
          key="1"
          >
            <Flex justifyContent="between" alignItems="center">
              <span>
                <AppstoreFilled /> 
                <span><NavLink to={`${DASHBOARD_PREFIX_PATH}`}> Dashboard </NavLink></span>
              </span>
            </Flex>
        </Menu.Item>
        
        {
          authUser?.role === ROLES.superAdmin ? (
            <Menu.Item
              key="2"
              >
                <Flex justifyContent="between" alignItems="center">
                  <span>
                    <RiseOutlined />
                    <span><NavLink to={`${STEP_PREFIX_PATH}`}> Step Management </NavLink></span>
                  </span>
                </Flex>
            </Menu.Item>
          ) : (<></>) 
        }

      </Menu>
	)
}

const mapStateToProps = ({ theme, auth }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction } =  theme;
  const { authUser } = auth;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction, authUser }
};

const mapDispatchToProps = {
  signOut
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu)
