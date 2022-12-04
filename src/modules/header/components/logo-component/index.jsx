import React from 'react';

import styles from './styles.module.sass';

export const LogoComponent = (props) => {
  const { burgStatus = true, sandStatus = true } = props;

  const buttonClickHandler = (rest) => {
    alert(rest);
  };

  return (
    <div className={styles.container}>
      <button
        className={!sandStatus ? styles.logo__disabled : ''}
        onClick={() => buttonClickHandler(1)}
      />
      <button
        className={!burgStatus ? styles.logo__disabled : ''}
        onClick={() => buttonClickHandler(2)}
      />
    </div>
  );
};
