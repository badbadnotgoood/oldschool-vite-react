import React from 'react';
import { Events, scroller } from 'react-scroll';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import cn from 'classnames';

import styles from './styles.module.sass';

import { CategorySkeleton } from './components';

export const CategoryComponent = (props) => {
  const {
    categoriesContainerRef,
    sectionsContainerRef,
    categoriesRefs,
    scrollStatus,
    setScrollStatus,
    activeSection,
    setActiveSection,
    data = [],
  } = props;

  const clickHandler = (index, ref) => {
    if (scrollStatus) {
      Events.scrollEvent.register('begin', () => {
        setScrollStatus(false);
      });

      scroller.scrollTo(`section-${index}`, {
        smooth: true,
        duration: 500,
        offset: -sectionsContainerRef.current?.offsetTop,
      });

      setActiveSection(`section-${index}`);

      scrollIntoView(ref.current, {
        behavior: 'smooth',
        inline: 'center',
        boundary: categoriesContainerRef.current,
      });

      Events.scrollEvent.register('end', () => {
        setScrollStatus(true);
      });
    }
  };

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <CategorySkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={categoriesContainerRef}>
      <ul className={styles.content}>
        {data.map((name, i) => {
          const burg__bool = name === 'Бургеры';
          const sand__bool = name === 'Сэндвичи';
          const active__bool = activeSection === `section-${i}`;
          const buttonClass = cn(
            burg__bool
              ? styles.burg__def
              : sand__bool
              ? styles.sand__def
              : styles.def__def,
            active__bool
              ? burg__bool
                ? styles.burg__active
                : sand__bool
                ? styles.sand__active
                : styles.def__active
              : ''
          );

          return (
            <li
              key={`category-${i}`}
              className={buttonClass}
              onClick={() => clickHandler(i, categoriesRefs.current[i])}
              ref={categoriesRefs.current[i]}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
