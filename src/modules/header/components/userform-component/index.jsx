import React from 'react';

import styles from './styles.module.sass';

export const UserFormComponent = (props) => {
  const { authStatus = false, basketCount = 0 } = props;

  return (
    <div className={styles.container}>
      {authStatus ? (
        <button className={styles.auth} onClick={() => alert('че')}>Профиль</button>
      ) : (
        <button className={styles.auth} onClick={() => alert('че')}>Войти</button>
      )}
      <button className={styles.basket} onClick={() => alert('че')}>
        <span>Корзина</span>
        <div className={styles.vl}/>
        <span>{basketCount}</span>
      </button>

    </div>
  );
};
