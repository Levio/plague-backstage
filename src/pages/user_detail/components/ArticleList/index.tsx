import React from 'react';
import Title from '../Title';
import { Table } from 'antd';

import { ColumnsType } from 'antd/lib/table/interface';

import styles from './index.less';

export interface ArticleItemType {
  time?: string;
  content?: string;
  url?: string;
  status?: '0' | '1';
}

interface ArticleProps {
  loading?: boolean;
  datasource?: object[];
}

const Article: React.FC<ArticleProps> = props => {
  const { loading, datasource = [] } = props;

  const columns: ColumnsType<ArticleItemType> = [
    {
      dataIndex: 'time',
      title: '时间',
    },
    {
      dataIndex: 'content',
      title: '内容',
    },
    {
      dataIndex: 'status',
      title: '状态',
      render(value) {
        return value == -'0' ? '正常' : '异常';
      },
    },
  ];
  return (
    <div>
      <Title title="文章列表"></Title>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        loading={loading}
        scroll={{ y: 500 }}
        dataSource={datasource}
        className={styles.table}
        pagination={false}
      ></Table>
    </div>
  );
};

export default Article;
