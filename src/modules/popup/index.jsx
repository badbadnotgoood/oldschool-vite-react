import React from 'react';

import styles from './styles.module.sass';

export const PopupComponent = (props) => {
  const { setShow } = props;

  const clickHandler = (e) => {
    const { target, currentTarget } = e;

    if (target === currentTarget) {
      setShow(false);
    }
  };

  return (
    <div
      className={styles.popup__container}
      onClick={(e) => {
        clickHandler(e);
      }}
    >
      <div className={styles.popup__content}>{props.children}</div>
    </div>
  );
};
