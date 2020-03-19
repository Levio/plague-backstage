import React from 'react';
import FilterForm from '@/components/FilterForm';

import styles from './index.less';
import { FilterItemType } from '@/components/FilterForm/data';

const items: FilterItemType[] = [
  {
    type: 'input',
    name: 'name',
    label: '用户昵称',
  },
  {
    type: 'date',
    name: 'registerTime',
    label: '注册时间',
  },
  {
    type: 'select',
    name: 'isdanger',
    label: '是否有风险',
    options: [
      {
        key: '1',
        value: '是',
      },
      {
        key: '0',
        value: '否',
      },
    ],
  },
  {
    type: 'switch',
    name: 'type',
    label: '是否存活',
  },
];

const User: React.FC = props => {
  const onSearch = (values: any) => {
    console.log(values);
  };
  return (
    <div className={styles.container}>
      <div>
        <FilterForm items={items} onSubmit={onSearch}></FilterForm>
      </div>
    </div>
  );
};

export default User;
