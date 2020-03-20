import React, { useState, useEffect } from 'react';
import FilterForm from '@/components/FilterForm';
import { Table, Tag } from 'antd';
import { useFetchLoading } from '@/hooks';
import { filterUser } from '@/services/user';
import styles from './index.less';

import { FilterItemType } from '@/components/FilterForm/data';
import { ColumnsType } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table';
import { UserTableListItemType } from './data';

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

/**
 * 简易的数字或可转化为数字的字符串比较函数
 * @param a
 * @param b
 * @param key
 */
const sortNumFunc = (
  a: UserTableListItemType,
  b: UserTableListItemType,
  key: keyof UserTableListItemType,
): number => {
  const prev = Number(a[key]) || 0,
    next = Number(b[key]) || 0;
  return prev - next;
};

const resolveRowClassNameFunc = (record: UserTableListItemType, index: number): string => {
  if (record.isdanger === '1') {
    return styles['danger-row'];
  }
  return '';
};

const User: React.FC = props => {
  const [datasource, setDatasource] = useState<object[]>([]);

  const columns: ColumnsType<UserTableListItemType> = [
    {
      dataIndex: 'username',
      title: '用户名称',
    },
    {
      dataIndex: 'gender',
      title: '性别',
      render(value) {
        return value === '0' ? '女' : '男';
      },
    },
    {
      dataIndex: 'apartment',
      title: '部门',
    },
    {
      dataIndex: 'registerTime',
      title: '注册时间',
    },
    {
      dataIndex: 'trackNum',
      title: '轨迹数量',
      sorter: (a, b) => sortNumFunc(a, b, 'trackNum'),
    },
    {
      dataIndex: 'isdanger',
      title: '是否有风险',
    },
    {
      dataIndex: 'dangerNum',
      title: '风险命中数',
      sorter: (a, b) => sortNumFunc(a, b, 'dangerNum'),
    },
    {
      dataIndex: 'articlePushNum',
      title: '文章推送数',
      sorter: (a, b) => sortNumFunc(a, b, 'articlePushNum'),
    },
    {
      dataIndex: 'status',
      title: '状态',
      render(value) {
        return value === '0' ? <Tag color="magenta">禁用</Tag> : <Tag color="green">正常</Tag>;
      },
    },
  ];

  /**
   * 筛选用户
   * @param values
   */
  const onSearchFunc = async (values: any) => {
    try {
      const { code, data } = await filterUser(values);
      if (code === '200') {
        setDatasource(data);
      }
    } catch (error) {}
  };
  const [loading, onSearch] = useFetchLoading(onSearchFunc);

  // 初始化表格数据
  useEffect(() => {
    onSearch({});
    const height = document.querySelector('#scrollTable');
    console.log(height && height.clientHeight);
  }, []);

  return (
    <div className={styles.container}>
      <FilterForm items={items} onSubmit={onSearch}></FilterForm>
      <Table
        id="scrollTable"
        bordered
        rowKey="id"
        columns={columns}
        loading={loading}
        scroll={{ y: 500 }}
        dataSource={datasource}
        className={styles.table}
        rowClassName={resolveRowClassNameFunc}
        pagination={{
          size: 'small',
          showSizeChanger: true,
          showQuickJumper: true,
          total: datasource.length,
          showTotal: total => `共${total}条`,
        }}
      ></Table>
    </div>
  );
};

export default User;
