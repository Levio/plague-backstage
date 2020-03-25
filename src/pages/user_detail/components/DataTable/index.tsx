import React, { ReactNode } from 'react';

import styles from './index.less';
import { Button, Table } from 'antd';
import Tabs, { TabsProps } from 'antd/lib/tabs';
import { EnvironmentOutlined, CarOutlined } from '@ant-design/icons';

import { ColumnsType } from 'antd/lib/table/interface';
import Title from '../Title';
import { RegionTableItemType, DataTableProps } from './data';

interface TabPaneListItemType {
  title: string | ReactNode;
  icon: ReactNode;
  columns: ColumnsType<object>;
  datasource: object[];
  key: string;
}

const { TabPane } = Tabs;

const DataTable: React.FC<DataTableProps> = props => {
  const { loading, datasource } = props;
  const { region = [], track = [], commuting = [] } = datasource;

  // 去过的地方columns
  const regionColumns: ColumnsType<RegionTableItemType> = [
    {
      dataIndex: 'province',
      title: '省',
    },
    {
      dataIndex: 'city',
      title: '市',
    },
    {
      dataIndex: 'district',
      title: '区',
    },
    {
      dataIndex: 'address',
      title: '详细地址',
    },
    {
      dataIndex: 'isdanger',
      title: '是否有风险',
      render(value) {
        return value === '0' ? '否' : '是';
      },
    },
    {
      dataIndex: 'cus-options',
      title: '操作',
      render(value, record) {
        return (
          <>
            <Button style={{ fontSize: 12, marginRight: 15 }} type="primary" size="small">
              修改
            </Button>
            <Button style={{ fontSize: 12 }} type="danger" size="small">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  // 交通工具table columns
  const trackColumns: ColumnsType<RegionTableItemType> = [
    {
      dataIndex: 'time',
      title: '日期',
    },
    {
      dataIndex: 'from',
      title: '出发地',
    },
    {
      dataIndex: 'to',
      title: '目的地',
    },
    {
      dataIndex: 'no',
      title: '车次/航班号/车牌号',
    },
    {
      dataIndex: 'isdanger',
      title: '是否有风险',
      render(value) {
        return value === '0' ? '否' : '是';
      },
    },
    {
      dataIndex: 'cus-options',
      title: '操作',
      render(value, record) {
        return (
          <>
            <Button style={{ fontSize: 12, marginRight: 15 }} type="primary" size="small">
              修改
            </Button>
            <Button style={{ fontSize: 12 }} type="danger" size="small">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  // 通勤工具columns
  const commutingColumns: ColumnsType<RegionTableItemType> = [
    {
      dataIndex: 'province',
      title: '省',
    },
    {
      dataIndex: 'city',
      title: '市',
    },
    {
      dataIndex: 'district',
      title: '区',
    },
    {
      dataIndex: 'tool',
      title: '通勤工具',
    },
    {
      dataIndex: 'startTime',
      title: '出发时间',
    },
    {
      dataIndex: 'endTime',
      title: '抵达时间',
    },
    {
      dataIndex: 'cus-options',
      title: '操作',
      render(value, record) {
        return (
          <>
            <Button style={{ fontSize: 12, marginRight: 15 }} type="primary" size="small">
              修改
            </Button>
            <Button style={{ fontSize: 12 }} type="danger" size="small">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const tabPaneList: TabPaneListItemType[] = [
    {
      title: '去过的地方',
      icon: <EnvironmentOutlined />,
      columns: regionColumns,
      datasource: region,
      key: '1',
    },
    {
      title: '交通工具',
      icon: <CarOutlined />,
      columns: trackColumns,
      datasource: track,
      key: '2',
    },
    {
      title: '通勤工具',
      icon: <CarOutlined />,
      columns: commutingColumns,
      datasource: commuting,
      key: '3',
    },
  ];

  /**
   * tabbar 渲染函数
   * @param tabProps
   * @param DefaultTabbar
   */
  const renderTabBar: TabsProps['renderTabBar'] = (tabProps, DefaultTabbar) => {
    return (
      <div className={styles['cus-tab-bar-container']}>
        <Title title="轨迹信息"></Title>
        <DefaultTabbar {...tabProps} style={{ marginBottom: -2 }}></DefaultTabbar>
        <div>
          <Button type="primary" size="small" style={{ marginRight: 12, fontSize: 12 }}>
            导入
          </Button>
          <Button type="primary" size="small" style={{ fontSize: 12 }}>
            导出
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Tabs type="card" renderTabBar={renderTabBar}>
        {tabPaneList.map(tabpane => {
          return (
            <TabPane
              tab={
                <span>
                  {tabpane.icon}
                  {tabpane.title}
                </span>
              }
              key={tabpane.key}
            >
              <Table
                bordered
                rowKey="id"
                columns={tabpane.columns}
                loading={loading}
                scroll={{ y: 500 }}
                dataSource={tabpane.datasource}
                className={styles.table}
                pagination={false}
              ></Table>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default DataTable;
