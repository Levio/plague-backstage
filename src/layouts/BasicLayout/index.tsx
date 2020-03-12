import React, { useState, ReactNode } from 'react';
import { Layout } from 'antd';

import BasicHeader from './Header';
import BasicMenu from './Menu';

import styles from './index.less';

const { Content, Footer, Sider } = Layout;

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
        <BasicMenu></BasicMenu>
      </Sider>
      <Layout>
        <BasicHeader></BasicHeader>
        <Content style={{ margin: '0 16px' }}>
          <div className={styles.main}>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>疫镜 &copy; 2020-03-09</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
