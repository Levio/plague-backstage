/**
 * 侧边栏菜单配置文件
 */

export interface MenuState {
  key: string;
  title: string;
  path: string;
  icon?: string;
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
    icon: 'user',
  },
  {
    key: 'tool',
    title: '疫情工具管理',
    path: '/tool',
    icon: 'tool',
  },
  {
    key: 'track',
    title: '轨迹管理',
    path: '/track',
    icon: 'car',
  },
  {
    key: 'rim',
    title: '周边疫情',
    path: '/rim',
    icon: 'environment',
  },
  {
    key: 'permission',
    title: '权限管理',
    path: '/permission',
    icon: 'setting',
  },
];

export default MENUCONFIG;
