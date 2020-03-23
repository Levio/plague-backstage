import React, { ReactNode, useState, useEffect } from 'react';
import { Menu } from 'antd';
import MENUCONFIG, { MenuState } from '@/config/menu';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { UserStateType } from '@/models/user';
import { router } from 'umi';
import { SelectParam } from 'antd/lib/menu';

const { SubMenu } = Menu;

interface BasicMenuProps {
  userState?: UserStateType;
}

const findOpenOrSelectKeys = (
  menuTag: string,
  source: MenuState[] = [],
  res?: string[],
): void | string[] => {
  for (const item of source) {
    if (item.key === menuTag) {
      res = item.parentKeys || [];
    } else if (item.children) {
      findOpenOrSelectKeys(menuTag, item.children, res);
    }
  }
};

const BasicMenu: React.FC<BasicMenuProps> = props => {
  const { userState = {} } = props;
  const { currentAuthority } = userState;
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['user']);
  const [openKeys, setOpenKeys] = useState<string[]>(['user']);

  const onSelect = (menu: SelectParam) => {
    setSelectedKeys([menu.key]);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const menuTag = pathname.split('/')[1];
    const a: string[] = [];
    findOpenOrSelectKeys(menuTag, MENUCONFIG, a);
    console.log(a);
    // setOpenKeys(findOpenOrSelectKeys(menuTag, MENUCONFIG) || []);
  }, []);

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
    <Menu
      theme="dark"
      defaultSelectedKeys={['user']}
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
    >
      {resolveMenu(MENUCONFIG)}
    </Menu>
  );
};

export default connect(({ user }: ConnectState) => ({
  userState: user,
}))(BasicMenu);
