import React from 'react';
import { TagOutlined } from '@ant-design/icons';
import styles from './index.less';

interface TitleProps {
  title?: string;
}

const Title: React.FC<TitleProps> = props => {
  const { title } = props;
  return (
    <div className={styles.title}>
      <div className={styles['title-text-box']}>
        <TagOutlined style={{ fontSize: 18, color: '#4c7ff7', marginRight: 10 }} />
        <span className={styles['title-text']}>{title}</span>
      </div>
    </div>
  );
};

export default Title;
