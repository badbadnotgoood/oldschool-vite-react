import React from 'react';

import styles from './styles.module.sass';

export const CategorySkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={`category-${i}`} className={styles.category} />
      ))}
    </>
  );
};
