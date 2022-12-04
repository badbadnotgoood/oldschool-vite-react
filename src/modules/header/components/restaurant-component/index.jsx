import React from 'react';

import styles from './styles.module.sass';

export const RestaurantMobile = (props) => {
  const { delivery = '', address = '', time1 = '', time2 = '' } = props;

  return (
    <div className={styles.container}>
      <button className={styles.content__mobile} onClick={() => alert('САЛАМ')}>
        <span className={styles.delivery}>{delivery}</span>
        <div className={styles.address__container}>
          <span className={styles.address}>{address}</span>
          <span className={styles.address__dot}></span>
          <span
            className={styles.address__time}
          >{`c ${time1} до ${time2}`}</span>
        </div>
      </button>
      <span className={styles.address__icon}></span>
    </div>
  )
}

export const RestaurantDesktop = (props) => {
  const { delivery = '', address = '', time1 = '', time2 = '' } = props;

  return (
    <div className={styles.positionWrapper}>
      <button className={styles.side__button}>
        <div className={styles.button__line} />
        <div className={styles.button__line} />
        <div className={styles.button__line} />
      </button>
      <button className={styles.content} onClick={() => alert('САЛАМ')}>
        <span className={styles.delivery}>{delivery}</span>
        <div className={styles.address__container}>
          <span className={styles.address}>{address}</span>
          <span className={styles.address__dot}></span>
          <span
            className={styles.address__time}
          >{`c ${time1} до ${time2}`}</span>
        </div>
        <span className={styles.address__icon}></span>
      </button>
    </div>
  );
};

