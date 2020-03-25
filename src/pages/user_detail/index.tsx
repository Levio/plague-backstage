import React, { useEffect, useState } from 'react';
import { RouterTypes } from 'umi';
import { fetchUserDetail } from '@/services/user';

import styles from './index.less';
import BaseInfo from './components/BaseInfo';
import DataTable from './components/DataTable';
import Article from './components/ArticleList';

import { UserTableListItemType } from '@/pages/user/data';
import { DataTableSourceProps } from './components/DataTable/data';
import { ArticleItemType } from './components/ArticleList';

interface matchParamsType {
  id: string | number;
}

export interface BaseInfoType extends UserTableListItemType {
  avatar?: string;
}

export interface UserDetailType {
  baseInfo?: BaseInfoType;
  dataInfo?: DataTableSourceProps;
  articleInfo?: ArticleItemType[];
}

export interface UserDetailProps extends Partial<RouterTypes<{}, matchParamsType>> {}

const UserDetail: React.FC<UserDetailProps> = props => {
  const { computedMatch } = props;
  const userId = computedMatch && computedMatch.params.id;

  const [userDetail, setUserDetail] = useState<UserDetailType>({});

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
      <BaseInfo data={userDetail.baseInfo || {}}></BaseInfo>
      <DataTable datasource={userDetail.dataInfo || {}}></DataTable>
      <Article datasource={userDetail.articleInfo}></Article>
    </div>
  );
};

export default UserDetail;
