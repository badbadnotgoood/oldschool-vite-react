import React, { useState, useLayoutEffect } from 'react';

import styles from './styles.module.sass';

export const MenuSkeleton = (props) => {
  const [itemsCount, setItemsCount] = useState(8);

  const handleSize = () => {
    const { innerWidth } = window;

    setItemsCount(innerWidth >= 1000 ? 8 : 6);
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div className={styles.section} key={`section-${i}`}>
          <div className={styles.section__name} />
          <div className={styles.section__items}>
            {[...Array(itemsCount)].map((_, i) => (
              <div className={styles.item} key={`item-${i}`}>
                <div className={styles.item__image} />
                <div className={styles.item__info}>
                  <div className={styles.item__name} />
                  <div className={styles.item__price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
