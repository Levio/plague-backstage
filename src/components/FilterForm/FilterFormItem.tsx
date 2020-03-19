import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Switch } from 'antd';

import { FormItemProps } from 'antd/lib/form';
import { FilterItemType, ItemPropsType, OptionsType } from './data.d';
type FormItemChildrenType = FormItemProps['children'];

interface FilterFormItemProps {
  data?: FilterItemType[];
}

const FormItem = Form.Item;

/**
 * 返回formitem 样式
 * @param flag 是否为每行最后一个元素
 */
const formItemStyle = (flag: boolean): React.CSSProperties => ({
  minWidth: '33.3%',
  maxWidth: '33.3%',
  height: 32,
  paddingRight: flag ? 0 : 20,
  flex: 1,
});

interface ResolveSelectProps {
  name: string;
  itemProps?: ItemPropsType;
  options?: OptionsType[];
  fetchOptions?: FilterItemType['fetchOptions'];
}

/**
 * 支持异步获取options的select
 * @param props
 */
const ResolveSelect: React.FC<ResolveSelectProps> = props => {
  const { name, fetchOptions, itemProps, options } = props;
  const [_options, setOptions] = useState<OptionsType[]>(options || []);

  useEffect(() => {
    (async () => {
      if (!options && fetchOptions) {
        const { data = [] } = await fetchOptions();
        setOptions(data);
      }
    })();
  }, []);
  return (
    // 由于自定义组件无法触发外层form的values变化，所以嵌套一层formItem
    <FormItem name={name}>
      <Select placeholder="请选择..." {...itemProps}>
        {_options.map(option => {
          return (
            <Select.Option key={option.key} value={option.key}>
              {option.value}
            </Select.Option>
          );
        })}
      </Select>
    </FormItem>
  );
};

/**
 * 根据filter item data 返回筛选表格选项
 * @param data filter item data
 */
const FilterFormItem: React.FC<FilterFormItemProps> = props => {
  const { data = [] } = props;

  /**
   * 生成filter item node
   */
  const filterItemNodes = data.map((item, index) => {
    let node: FormItemChildrenType = null;

    switch (item.type) {
      case 'input':
        node = <Input placeholder="请输入..." {...item.itemProps} autoComplete="off"></Input>;
        break;
      case 'select':
        node = (
          <ResolveSelect
            name={item.name}
            itemProps={item.itemProps}
            options={item.options}
            fetchOptions={item.fetchOptions}
          ></ResolveSelect>
        );
        break;
      case 'date':
        node = (
          <DatePicker
            picker="date"
            placeholder="请选择时间"
            format={'YYYY-MM'}
            style={{ width: '100%' }}
            {...item.itemProps}
          />
        );
        break;
      case 'switch':
        node = <Switch />;
        break;
      default:
        break;
    }

    const formItemName = item.type === 'select' ? undefined : item.name;
    const formItemValuePropName = item.type === 'switch' ? 'checked' : 'value';

    return (
      <FormItem
        style={formItemStyle((index + 1) % 3 === 0)}
        key={item.name}
        rules={item.rules}
        name={formItemName}
        label={item.label}
        valuePropName={formItemValuePropName}
      >
        {node}
      </FormItem>
    );
  });
  return <>{filterItemNodes}</>;
};

export default FilterFormItem;
