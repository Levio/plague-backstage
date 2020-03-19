import React from 'react';
import classnames from 'classnames';

import styles from './index.less';
import { Form, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { FilterItemType } from './data';
import FilterFormItem from './FilterFormItem';

interface FilterFormProps {
  className?: string;
  items?: FilterItemType[];
  onSubmit?: (values: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = props => {
  const { className, items, onSubmit: onEmitSubmit } = props;
  const onsubmit = (values: any) => {
    onEmitSubmit && onEmitSubmit(values);
  };
  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.title}>
        <FilterOutlined style={{ color: '#4c7ff7', fontSize: 18, marginRight: 10 }} />
        筛选条件
      </div>
      <div className={styles.main}>
        <Form className={styles.form} onFinish={onsubmit}>
          <FilterFormItem data={items}></FilterFormItem>
          <Button style={{ marginLeft: 'auto' }} type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FilterForm;
