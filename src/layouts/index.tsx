import React, { useState, ReactNode } from 'react';
import { Layout, Breadcrumb } from 'antd';

import LayoutMenu from './Menu';

import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout: React.FC = props => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  /**
   * 切换展开状态函数
   * @param collapsed 展开状态
   */
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  /**
   * 渲染logo
   */
  const renderLogo = (): ReactNode => {
    return (
      <>
        <img className={styles.img} src={require('@/assets/logo.png')}></img>
        {collapsed ? null : <div className={styles.name}>疫镜</div>}
      </>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>{renderLogo()}</div>
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>疫镜 &copy; 2020-03-09</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
