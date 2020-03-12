import React, { useState } from 'react';
import classnames from 'classnames';
import useMergeValue from 'use-merge-value';
import { Tabs, Form } from 'antd';

import LoginContext from './LoginContext';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';

import styles from './index.less';

interface LoginFormProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  className?: string;
  children: React.ReactComponentElement<typeof LoginTab>[];
}

type LoginTabType = React.ReactComponentElement<typeof LoginTab>;

interface LoginFormType extends React.FC<LoginFormProps> {
  Tab: typeof LoginTab;
  Submit: typeof LoginSubmit;
}

const LoginForm: LoginFormType = props => {
  const { className } = props;
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const tabChildren: LoginTabType[] = [];
  const otherChildren: React.ReactElement<unknown>[] = [];

  React.Children.forEach(props.children, (child: React.ReactElement<unknown> | LoginTabType) => {
    if (!child) return;
    if ((child.type as { typeName: string }).typeName === 'LoginTab') {
      tabChildren.push(child as LoginTabType);
    } else {
      otherChildren.push(child);
    }
  });

  const [tab, setTab] = useState<string[]>([]);
  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab(id) {
            setTab([...tab, id]);
          },
          removeTab(id) {
            setTab(tab.filter(item => item !== id));
          },
        },
      }}
    >
      <div className={classnames(className, styles.container)}>
        <Form>
          {/* 判断是否传入了tab */}
          {tab.length ? (
            <>
              <Tabs animated={false} activeKey={type} onChange={setType}>
                {tabChildren}
              </Tabs>
              {otherChildren}
            </>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

LoginForm.Tab = LoginTab;
LoginForm.Submit = LoginSubmit;

export default LoginForm;