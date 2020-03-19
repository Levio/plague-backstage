import { Rule, FormItemProps } from 'antd/lib/form';
import { ReactNode } from 'react';

export interface OptionsType {
  key: string | number;
  value: string | number;
}

interface ItemPropsType {
  [key: string]: unknown;
}

export interface FilterItemType {
  name: string; // form name 也代表字段id
  type: 'input' | 'select' | 'date' | 'switch'; // form item type
  label: string; // label
  itemProps?: ItemPropsType;
  options?: OptionsType[]; // select's options
  rules?: Rule[]; // 校验规则
  fetchOptions?: () => Promise<any>; // 获取select options的请求方法
}
