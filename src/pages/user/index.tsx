import React, { useState, useEffect } from 'react';
import FilterForm from '@/components/FilterForm';
import { Table, Tag, Button, Modal } from 'antd';
import { useFetchLoading } from '@/hooks';
import { filterUser } from '@/services/user';
import styles from './index.less';

import { FilterItemType } from '@/components/FilterForm/data';
import { ColumnsType } from 'antd/lib/table/interface';
import { UserTableListItemType } from './data';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { router } from 'umi';

/**
 * 筛选条件配置items
 */
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

/**
 * 行样式函数, 对于危险用户用红色标出
 * @param record
 * @param index
 */
const resolveRowClassNameFunc = (record: UserTableListItemType, index: number): string => {
  if (record.isdanger === '1') {
    return styles['danger-row'];
  }
  return '';
};

const User: React.FC = props => {
  const [datasource, setDatasource] = useState<object[]>([]);
  const [tableScrollHeight, setTableScrollHeight] = useState<number>(500);

  /**
   * 查看表格内容详情
   * @param record
   */
  const onViewTableItemClick = (record: UserTableListItemType) => {
    console.log(record);
    router.push(`/user/user_detail/${record.id}`);
  };

  /**
   * 删除表格内容
   * @param record
   */
  const onDeleteTableItemClick = (record: UserTableListItemType) => {
    Modal.confirm({
      title: '操作警告',
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          确认删除用户 <span style={{ fontWeight: 'bold' }}>{record.username}</span> 吗？
        </>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log(record);
      },
    });
  };

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
    {
      dataIndex: 'cus-options',
      title: '操作',
      render(value, record) {
        return (
          <>
            <Button
              style={{ fontSize: 12, marginRight: 15 }}
              type="primary"
              size="small"
              onClick={() => onViewTableItemClick(record)}
            >
              查看
            </Button>
            <Button
              style={{ fontSize: 12 }}
              type="danger"
              size="small"
              onClick={() => onDeleteTableItemClick(record)}
            >
              删除
            </Button>
          </>
        );
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
    const height = document.querySelector(`.${styles.table}`);
    setTableScrollHeight((height as Element).clientHeight - 120 || 500);
  }, []);

  return (
    <div className={styles.container}>
      <FilterForm items={items} onSubmit={onSearch}></FilterForm>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        loading={loading}
        scroll={{ y: tableScrollHeight }}
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
