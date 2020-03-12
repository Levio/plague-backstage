import React from 'react';
import classnames from 'classnames';
import { Button, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import styles from './index.less';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const FormItem = Form.Item;

const LoginSubmit: React.FC<LoginSubmitProps> = props => {
  const { className, ...restProps } = props;
  const clsString = classnames(styles.submit, className);
  return (
    <FormItem>
      <Button className={clsString} htmlType="submit" type="primary" {...restProps} />
    </FormItem>
  );
};

export default LoginSubmit;
