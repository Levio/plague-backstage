import React, { useState, ReactNode, useEffect } from 'react';
import { Layout } from 'antd';

import styles from './index.less';

import Authoried from '@/pages/Authorized';
import BasicHeader from './Header';
import BasicMenu from './Menu';

import RouterTypes from 'umi/routerTypes';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { LOCAL_USERINFO_KEY } from '@/config/const';
import { router } from 'umi';
import { LoginStateType } from '@/models/login';

const { Content, Footer, Sider } = Layout;

interface RouteType {
  authority?: string[];
}
interface BasicLayoutProps extends RouterTypes<RouteType> {
  loginState?: LoginStateType;
  dispatch: Dispatch<AnyAction>;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { route = {} } = props;
  const { authority } = route;

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

  useEffect(() => {
    const { loginState = {} } = props;
    const { status } = loginState;
    // 是否登录成功
    if (status !== 'ok') {
      // 登录状态是否过期
      const localLoginUserInfo = JSON.parse(localStorage.getItem(LOCAL_USERINFO_KEY) || '{}');
      if (localLoginUserInfo.id === undefined) {
        router.push('/login');
      } else {
        const { dispatch } = props;
        dispatch({
          type: 'user/updateFetch',
          payload: localLoginUserInfo,
        });
      }
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>{renderLogo()}</div>
        <BasicMenu></BasicMenu>
      </Sider>
      <Layout>
        <BasicHeader></BasicHeader>
        <Content style={{ margin: '0 16px' }}>
          <div className={styles.main}>
            <Authoried authority={authority}>{props.children}</Authoried>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>疫镜 &copy; 2020-03-09</Footer>
      </Layout>
    </Layout>
  );
};

export default connect(({ login }: ConnectState) => ({
  loginState: login,
}))(BasicLayout);
