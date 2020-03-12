import React, { useEffect } from 'react';
import LoginContext, { LoginContextProps } from './LoginContext';
import { Tabs } from 'antd';
import { TabPaneProps } from 'antd/lib/tabs';

const { TabPane } = Tabs;

interface LoginTabProps extends TabPaneProps {
  //   active?: boolean;
  tabUtil: LoginContextProps['tabUtil'];
}

// tab key生成函数
const resolveUniqueId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const LoginTab: React.FC<LoginTabProps> = props => {
  useEffect(() => {
    const uniqueId = resolveUniqueId('login-tab-');
    const { tabUtil } = props;
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);

  const { children } = props;
  return <TabPane {...props}>{children}</TabPane>;
};

const WrapContext: React.FC<TabPaneProps> & {
  typeName: string;
} = props => {
  return (
    <LoginContext.Consumer>
      {context => <LoginTab tabUtil={context.tabUtil} {...props}></LoginTab>}
    </LoginContext.Consumer>
  );
};

WrapContext.typeName = 'LoginTab';

export default WrapContext;
