import React, { ReactNode } from 'react';
import { Menu } from 'antd';
import MENUCONFIG, { MenuState } from '@/config/menu';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { UserStateType } from '@/models/user';
import { router } from 'umi';

const { SubMenu } = Menu;

interface BasicMenuProps {
  userState?: UserStateType;
}

const BasicMenu: React.FC<BasicMenuProps> = props => {
  const { userState = {} } = props;
  const { currentAuthority } = userState;

  const resolveMenu = (menu: MenuState[]): ReactNode => {
    return menu.map(item => {
      if (
        item.authority === undefined ||
        (item.authority && item.authority.includes(currentAuthority))
      ) {
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
            <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
              {item.icon ? item.icon : null}
              <span>{item.title}</span>
            </Menu.Item>
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <Menu theme="dark" defaultSelectedKeys={['user']} mode="inline">
      {resolveMenu(MENUCONFIG)}
    </Menu>
  );
};

export default connect(({ user }: ConnectState) => ({
  userState: user,
}))(BasicMenu);
