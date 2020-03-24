import React, { useState, CSSProperties } from 'react';
import classnames from 'classnames';

import styles from './index.less';

interface EasyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

const EasyImage: React.FC<EasyImageProps> = props => {
  const { src, alt, className, style } = props;
  const [isError, setIsError] = useState<boolean>(false);

  const onLoad = () => {
    setIsError(false);
  };

  const onError = () => {
    setIsError(true);
    // 可以在此处添加加载错误信息埋点
  };

  return isError ? (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={onError}
      onLoad={onLoad}
    ></img>
  ) : (
    <div className={classnames(styles.error, className)} style={style}></div>
  );
};

export default EasyImage;
