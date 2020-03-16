import React, { ReactNode } from 'react';
import { Menu } from 'antd';
import MENUCONFIG, { MenuState } from '@/config/menu';

const { SubMenu } = Menu;

const BasicMenu: React.FC = props => {
  const resolveMenu = (menu: MenuState[]): ReactNode => {
    return menu.map(item => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {item.icon ? item.icon : null}
                <span>{item.title}</span>
              </span>
            }
          >
            {resolveMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key}>
            {item.icon ? item.icon : null}
            <span>{item.title}</span>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu theme="dark" defaultSelectedKeys={['user']} mode="inline">
      {resolveMenu(MENUCONFIG)}
    </Menu>
  );
};

export default BasicMenu;
