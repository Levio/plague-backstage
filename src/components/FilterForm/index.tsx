import React from 'react';
import classnames from 'classnames';

import styles from './index.less';
import { Form, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { FilterItemType } from './data';

interface FilterFormProps {
  className?: string;
  items?: FilterItemType[];
}

const FilterForm: React.FC<FilterFormProps> = props => {
  const { className } = props;
  const onsubmit = () => {
    console.log(1);
  };
  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.title}>
        <FilterOutlined style={{ color: '#4c7ff7', fontSize: 18, marginRight: 10 }} />
        筛选条件
      </div>
      <div className={styles.main}>
        <Form onFinish={onsubmit}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FilterForm;
