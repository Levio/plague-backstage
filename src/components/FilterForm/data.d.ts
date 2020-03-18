import { Rule } from 'antd/lib/form';

export interface OptionsType {
  key: string | number;
  value: string | number;
}

export interface FilterItemType {
  name: string; // form name 也代表字段id
  type: 'input' | 'select' | 'date' | 'time' | 'datetime' | 'switch'; // form item type
  label: string; // label
  options?: OptionsType[]; // select's options
  rules?: Rule; // 校验规则
  defaultValue?: string; // 默认值
  fetchOptions?: () => OptionsType[]; // 获取select options的请求方法
}
