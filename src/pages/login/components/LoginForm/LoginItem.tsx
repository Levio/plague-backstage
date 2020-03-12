import React from 'react';
import { Input, Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

interface LoginItemProps extends Partial<FormItemProps> {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const LoginItem: React.FC<LoginItemProps> = props => {
  const { type } = props;
  if (type === 'Captcha') {
    return <div></div>;
  }

  return (
    <FormItem>
      <Input {...props} />
    </FormItem>
  );
};

export default LoginItem;
