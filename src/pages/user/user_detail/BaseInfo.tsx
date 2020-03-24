import React, { ReactNode, useEffect, useState } from 'react';

import styles from './index.less';
import { TagOutlined } from '@ant-design/icons';
import { Descriptions, Switch } from 'antd';
import { fetchUserDetail } from '@/services/user';
import { UserDetailType } from '../data';
import EasyImage from '@/components/EasyImage';

interface BaseInfoProps {
  id: string | number;
}

const BaseInfo: React.FC<BaseInfoProps> = props => {
  const { id: userId } = props;
  const [userDetail, setUserDetail] = useState<UserDetailType>({});

  const renderTitle = (title: string): ReactNode => {
    return (
      <div className={styles['title-text-box']}>
        <TagOutlined style={{ fontSize: 18, color: '#4c7ff7', marginRight: 10 }} />
        <span className={styles['title-text']}>{title}</span>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const { code, data } = await fetchUserDetail({ id: userId || '' });
        if (code === '200') {
          setUserDetail(data);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['base-info']}>
        <div className={styles.title}>{renderTitle('基本信息')}</div>
        <div className={styles.main}>
          <div className={styles['user-left-box']}>
            <EasyImage className={styles['user-avatar']} src={userDetail.avatar || ''}></EasyImage>
            <div className={styles['user-name']}>{userDetail.username}</div>
          </div>
          <div className={styles['user-right-box']}>
            <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              <Descriptions.Item label="性别">
                {userDetail.gender === '0' ? '男' : '女'}
              </Descriptions.Item>
              <Descriptions.Item label="轨迹数量">{userDetail.trackNum}</Descriptions.Item>
              <Descriptions.Item label="部门">{userDetail.apartment}</Descriptions.Item>
              <Descriptions.Item label="风险命中数">{userDetail.dangerNum}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{userDetail.registerTime}</Descriptions.Item>
              <Descriptions.Item label="文章推送数">{userDetail.articlePushNum}</Descriptions.Item>
              <Descriptions.Item label="手机号">
                {userDetail.phone || '18888888888'}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Switch checked={userDetail.status === '1'} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
