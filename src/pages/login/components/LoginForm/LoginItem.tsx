import React from 'react';
import { Input, Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';

import ItemMap from './map';

export interface LoginItemProps extends Partial<FormItemProps> {
  type?: string;
  name: string;
  inputProps?: InputProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
}

interface LoginItemType {
  UserName: React.FC<LoginItemProps>;
  Password: React.FC<LoginItemProps>;
}

const FormItem = Form.Item;

const LoginItem: React.FC<LoginItemProps> = props => {
  const { name, type, rules, inputProps, ...rest } = props;

  if (type === 'Captcha') {
    return <div>暂未开放</div>;
  }
  return (
    <FormItem rules={rules} name={name}>
      <Input {...inputProps} {...rest} />
    </FormItem>
  );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
    <LoginItem type={item.type} rules={item.rules} inputProps={item.props} {...props}></LoginItem>
  );
});

export default LoginItems as LoginItemType;
