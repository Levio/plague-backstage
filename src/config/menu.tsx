/**
 * 侧边栏菜单配置文件
 */
import {
  UserOutlined,
  ToolOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React, { ReactNode } from 'react';
export interface MenuState {
  key: string;
  title: string;
  path: string;
  icon?: ReactNode;
  children?: MenuState[];
}

/**
 * 侧边栏菜单内容数组
 */
const MENUCONFIG: MenuState[] = [
  {
    key: 'user',
    title: '用户管理',
    path: '/user',
    icon: <UserOutlined />,
  },
  {
    key: 'tool',
    title: '疫情工具管理',
    path: '/tool',
    icon: <ToolOutlined />,
  },
  {
    key: 'track',
    title: '轨迹管理',
    path: '/track',
    icon: <CarOutlined />,
  },
  {
    key: 'rim',
    title: '周边疫情',
    path: '/rim',
    icon: <EnvironmentOutlined />,
  },
  {
    key: 'permission',
    title: '权限管理',
    path: '/permission',
    icon: <SettingOutlined />,
  },
];

export default MENUCONFIG;
