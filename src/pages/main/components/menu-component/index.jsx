import React, { useState, useEffect, useRef } from 'react';
import ScrollLock from 'react-scrolllock';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

import { MenuSkeleton, DishComponent } from './components';

import styles from './styles.module.sass';

const MenuRenderComponent = (props) => {
  const {
    categoriesContainerRef,
    sectionsContainerRef,
    categoriesRefs,
    sectionsRefs,
    scrollStatus,
    activeSection,
    setActiveSection,
    data = [],
  } = props;

  const [containerOffset, setContainerOffset] = useState(0);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveitem] = useState({});

  const DishClickRef = useRef();

  useEffect(() => {
    if (sectionsContainerRef) {
      setContainerOffset(sectionsContainerRef.current?.offsetTop);
    }
  }, [sectionsContainerRef]);

  const itemClickHandler = (item) => {
    setActiveitem(item);
    setShow(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={sectionsContainerRef}>
        {data.map((section, i) => {
          const { name = '', items = [] } = section;

          useEffect(() => {
            const scrollHandler = () => {
              if (scrollStatus) {
                const offsetHeight =
                  sectionsRefs.current[i]?.current?.offsetHeight;
                const offsetTop = sectionsRefs.current[i]?.current?.offsetTop;
                const scrollOffsetTop = window.scrollY;

                const condition =
                  containerOffset &&
                  offsetHeight + offsetTop >
                    containerOffset * 1.5 + scrollOffsetTop &&
                  containerOffset * 1.5 + scrollOffsetTop >= offsetTop &&
                  activeSection !== `section-${i}`;

                if (condition) {
                  setActiveSection(`section-${i}`);

                  scrollIntoView(categoriesRefs.current[i].current, {
                    behavior: 'smooth',
                    inline: 'center',
                    boundary: categoriesContainerRef.current,
                  });
                }
              }
            };

            window.addEventListener('scroll', scrollHandler, { passive: true });
            return () =>
              window.removeEventListener('scroll', scrollHandler, {
                passive: true,
              });
          }, [
            scrollStatus,
            sectionsRefs,
            containerOffset,
            activeSection,
            setActiveSection,
          ]);

          return (
            <div
              className={styles.section}
              key={`section-${i}`}
              id={`secton-${i}`}
              name={`section-${i}`}
              ref={sectionsRefs.current[i]}
            >
              <div className={styles.section__name}>{name}</div>
              <div className={styles.section__items}>
                {items.map((item, i) => {
                  const { image = '', name = '', price = '' } = item;

                  return (
                    <button
                      className={styles.item}
                      key={`item-${i}`}
                      onClick={() => itemClickHandler(item)}
                    >
                      <div className={styles.item__image} />
                      <div className={styles.item__info}>
                        <div className={styles.item__name}>{name}</div>
                        <div className={styles.item__price}>{`${price} ₽`}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <ScrollLock isActive={show} />
        <DishComponent
          item={activeItem}
          setShow={setShow}
          show={show}
        />
      </div>
    </div>
  );
};

export const MenuComponent = (props) => {
  const { data = [] } = props;

  return data.length === 0 ? (
    <div className={styles.container}>
      <div className={styles.content}>
        <MenuSkeleton />
      </div>
    </div>
  ) : (
    <MenuRenderComponent {...props} />
  );
};
