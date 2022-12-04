import React, { useState, useEffect } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { useWindowSize } from '@hooks';
import { PopupComponent } from '@modules';

import { addToBasket } from '@actions';

import styles from './styles.module.sass';

import 'react-spring-bottom-sheet/dist/style.css';

const mealsReset = (meals, setMeals) => {
  let tempMeals = [];

  meals.map((el) => {
    const { name, priceDish, priceMod, codeDish, codeMod, mods, adds } = el;

    const newMeal = {
      name: name,
      priceDish: priceDish,
      priceMod: priceMod,
      codeDish: codeDish,
      codeMod: codeMod,
      mods: mods,
      adds: adds,
      dishToggle: false,
      modToggle: false,
    };

    tempMeals.push(newMeal);
  });

  setMeals(tempMeals);
};

const renderBread = (bread, func, setBreadPrice) => {
  const { name, price, status } = bread;

  return (
    <button
      className={styles.bread__button}
      onClick={() => {
        setBreadPrice(!status ? price : 0);
        func({ ...bread, status: !status });
      }}
    >
      <span className={status ? styles.bread__default : styles.bread__active}>
        Белый хлеб
      </span>
      <span className={!status ? styles.bread__default : styles.bread__active}>
        {name}
      </span>
    </button>
  );
};

const StaticMealsComponent = (props) => {
  const { meals } = props;

  return (
    <div className={styles.meals__container}>
      <span className={styles.data__title}>Мясо</span>
      <div className={styles.meals__content}>
        {meals.map((el, i) => {
          const { name } = el;

          const priceClass = cn(styles.meal__price, styles.price__active);

          return (
            <div className={styles.meal__container} key={`meal-${i}`}>
              <span className={styles.meal__name}>{name}</span>
              <button className={styles.meal__button}>
                <span className={priceClass}>
                  <div className={styles.meal__check} />
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MealsComponent = (props) => {
  const {
    meals,
    setMeals,
    setActiveMeal,
    setDataDisabled,
    setOneDishPrice,
    setMealsPrice,
  } = props;

  const isDishToggle = meals.filter(({ dishToggle }) => dishToggle);
  const isModToggle = meals.filter(({ modToggle }) => modToggle);

  useEffect(() => {
    setMealsPrice(
      meals
        .filter((el) => el.modToggle)
        .reduce((sum, current) => sum + current.priceMod, 0)
    );
  }, [meals]);

  const clickHandler = (element, index) => {
    const { priceDish, priceMod } = element;

    switch (true) {
      case isDishToggle.includes(element): {
        mealsReset(meals, setMeals);
        setDataDisabled(true);
        break;
      }
      case isModToggle.includes(element): {
        let tempMeals = [...meals];
        tempMeals[index].modToggle = false;
        setMeals(tempMeals);
        break;
      }
      case priceDish && isDishToggle.length <= 0: {
        let tempMeals = [...meals];
        tempMeals[index].dishToggle = true;
        setOneDishPrice(priceDish);
        setMeals(tempMeals);
        setActiveMeal(index);
        setDataDisabled(false);
        break;
      }
      case priceMod && isDishToggle.length > 0: {
        let tempMeals = [...meals];
        tempMeals[index].modToggle = true;
        setMeals(tempMeals);
        break;
      }
    }
  };

  return (
    <div className={styles.meals__container}>
      <span className={styles.data__title}>Выбор мяса</span>
      <div className={styles.meals__content}>
        {meals.map((el, i) => {
          const { name, priceDish, priceMod, dishToggle, modToggle } = el;

          const priceClass =
            dishToggle || modToggle
              ? cn(styles.meal__price, styles.price__active)
              : styles.meal__price;

          return (
            <div className={styles.meal__container} key={`meal-${i}`}>
              <span className={styles.meal__name}>{name}</span>
              <button
                className={styles.meal__button}
                onClick={() => {
                  clickHandler(el, i);
                }}
              >
                <span className={priceClass}>
                  {isDishToggle.length > 0 ? (
                    !dishToggle ? (
                      priceMod ? (
                        `${priceMod}₽`
                      ) : (
                        ''
                      )
                    ) : (
                      <div className={styles.meal__check} />
                    )
                  ) : (
                    `${priceDish}₽`
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ModsComponent = (props) => {
  const { mods, setMods, dataDisabled, setModsPrice } = props;

  const clickHandler = (index, status) => {
    let tempMods = [...mods];

    tempMods[index].isActive = !status;

    setMods(tempMods);
  };

  useEffect(() => {
    setModsPrice(
      mods
        .filter((el) => !el.isActive)
        .reduce((sum, current) => sum - current.price, 0)
    );
  }, [mods]);

  return (
    <div
      className={styles.mods__container}
      style={dataDisabled ? { opacity: '.5' } : {}}
    >
      <span className={styles.data__title}>Состав</span>
      <div className={styles.mods__content}>
        {mods.map((el, i) => {
          const { name, isActive, code } = el;

          return (
            <div className={styles.mod__container} key={`mod-${i}`}>
              <input
                className={styles.mod__checkbox}
                type="checkbox"
                checked={isActive}
                onChange={() => clickHandler(i, isActive)}
                disabled={dataDisabled}
              />
              <div className={styles.mod__name} id={`mod-${name}`}>
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AddsComponent = (props) => {
  const { adds, setAdds, dataDisabled, setAddsPrice } = props;

  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(dataDisabled);

  useEffect(() => {
    setAddsPrice(
      adds
        .filter((el) => el.count > 0)
        .reduce((sum, current) => sum + current.count * current.price, 0)
    );
  }, [adds]);

  const clickHandlerDecrease = (index, count) => {
    let tempAdds = [...adds];

    if (count > 0) {
      tempAdds[index].count--;
      setAdds(tempAdds);
    }
  };

  const clickHandlerIncrease = (index, count) => {
    let tempAdds = [...adds];

    if (count < 10) {
      tempAdds[index].count++;
      setAdds(tempAdds);
    }
  };

  return (
    <div
      className={styles.adds__container}
      style={dataDisabled ? { opacity: '.5' } : {}}
    >
      <span className={styles.data__title}>Дополнения</span>
      <div className={styles.adds__content}>
        {adds.map((el, i) => {
          const { name, price, count } = el;

          if (i < 7) {
            return (
              <div className={styles.add__container} key={`add-${i}`}>
                <div className={styles.add__text__container}>
                  <span className={styles.add__name}>{name}&nbsp;</span>
                  <span className={styles.add__price}>{`${price}₽`}</span>
                </div>
                <div className={styles.add__button__container}>
                  {count > 0 && (
                    <>
                      <button
                        className={styles.add__button__decrease}
                        onClick={() => clickHandlerDecrease(i, count)}
                        disabled={dataDisabled}
                      />
                      <span className={styles.add__button__count}>{count}</span>
                    </>
                  )}
                  <button
                    className={styles.add__button__increase}
                    onClick={() => clickHandlerIncrease(i, count)}
                    disabled={dataDisabled}
                  />
                </div>
              </div>
            );
          }
        })}
        {adds.length > 7 && (
          <div className={styles.adds__dropdown}>
            <div className={styles.adds__dropdown__content}>
              <span className={styles.adds__dropdown__text}>
                Другие дополнения
              </span>
              <button
                className={cn(
                  styles.adds__dropdown__button,
                  !show
                    ? styles.adds__dropdown__button__plus
                    : styles.adds__dropdown__button__minus
                )}
                style={show ? { backgroundColor: 'black' } : {}}
                onClick={() => setShow(!show)}
              ></button>
            </div>

            {show && (
              <div className={styles.dropdown__container}>
                {adds.map((el, i) => {
                  const { name, price, count } = el;

                  if (i >= 7) {
                    return (
                      <div className={styles.add__container} key={`add-${i}`}>
                        <div className={styles.add__text__container}>
                          <span className={styles.add__name}>{name}&nbsp;</span>
                          <span
                            className={styles.add__price}
                          >{`${price}₽`}</span>
                        </div>
                        <div className={styles.add__button__container}>
                          {count > 0 && (
                            <>
                              <button
                                className={styles.add__button__decrease}
                                onClick={() => clickHandlerDecrease(i, count)}
                                disabled={dataDisabled}
                              />
                              <span className={styles.add__button__count}>
                                {count}
                              </span>
                            </>
                          )}
                          <button
                            className={styles.add__button__increase}
                            onClick={() => clickHandlerIncrease(i, count)}
                            disabled={dataDisabled}
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const DishComponent = (props) => {
  const {
    setShow,
    show,
    item: {
      name = '',
      code = '',
      price = 0,
      image = '',
      bread,
      staticMeals = [],
      meals = [],
      mods = [],
      adds = [],
    } = {},
  } = props;

  const [activeMeal, setActiveMeal] = useState(0);
  const [dataDisabled, setDataDisabled] = useState(meals.length > 0);

  const [customMods, setCustomMods] = useState(mods);
  const [customAdds, setCustomAdds] = useState(adds);

  const [breadData, setBreadData] = useState();
  const [mealsArray, setMealsArray] = useState([]);
  const [modsArray, setModsArray] = useState([]);
  const [addsArray, setAddsArray] = useState([]);

  const [oneDishPrice, setOneDishPrice] = useState(
    meals.length > 0 ? meals[0].priceDish : price
  );
  const [breadPrice, setBreadPrice] = useState(0);
  const [mealsPrice, setMealsPrice] = useState(0);
  const [modsPrice, setModsPrice] = useState(0);
  const [addsPrice, setAddsPrice] = useState(0);

  const [dishCount, setDishCount] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const width = useWindowSize();

  useEffect(() => {
    setTotalPrice(
      (oneDishPrice + breadPrice + mealsPrice + modsPrice + addsPrice) *
        dishCount
    );
  }, [oneDishPrice, breadPrice, mealsPrice, modsPrice, addsPrice, dishCount]);

  useEffect(() => {
    if (mealsArray.length > 0) {
      setCustomMods(mealsArray[activeMeal].mods);
      setCustomAdds(mealsArray[activeMeal].adds);
    }
  }, [setCustomMods, setCustomAdds, activeMeal, mealsArray]);

  useEffect(() => {
    if (bread) {
      const { name, price, code } = bread;

      const newBread = {
        name: name,
        price: price,
        code: code,
        status: false,
      };

      setBreadData(newBread);
    }
  }, [bread, setBreadData]);

  useEffect(() => {
    if (meals.length > 0) {
      let tempMeals = [];

      meals.map((el) => {
        const {
          name,
          priceDish,
          priceMod,
          codeDish,
          codeMod,
          mods = [],
          adds = [],
        } = el;

        const newMeal = {
          name: name,
          priceDish: priceDish,
          priceMod: priceMod,
          codeDish: codeDish,
          codeMod: codeMod,
          mods: mods,
          adds: adds,
          dishToggle: false,
          modToggle: false,
        };

        tempMeals.push(newMeal);
      });

      setMealsArray(tempMeals);
    }
  }, [meals, setMealsArray]);

  useEffect(() => {
    console.log(customMods);
    if (customMods.length > 0) {
      let tempMods = [];

      customMods.map((el) => {
        const { name, price, code } = el;

        const newMod = {
          name: name,
          price: price,
          code: code,
          isActive: true,
        };

        tempMods.push(newMod);
      });

      setModsArray(tempMods);
    }
  }, [customMods, setModsArray]);

  useEffect(() => {
    if (customAdds.length > 0) {
      let tempAdds = [];

      customAdds.map((el) => {
        const { name, price, code } = el;

        const newAdd = {
          name: name,
          price: price,
          code: code,
          count: 0,
        };

        tempAdds.push(newAdd);
      });

      setAddsArray(tempAdds);
    }
  }, [customAdds, setAddsArray]);

  const dishCountDecrease = () => {
    if (dishCount > 1) {
      setDishCount(dishCount - 1);
    }
  };

  const dishCountIncrease = () => {
    if (dishCount < 5) {
      setDishCount(dishCount + 1);
    }
  };

  const toBasketClickHandler = () => {
    const finalDish = {
      name: '',
      code: '',
      quantity: dishCount,
      modifiers: [],
      price: totalPrice,
    };

    const mods = modsArray.filter(({ isActive }) => !isActive);
    const adds = addsArray.filter(({ count }) => count > 0);

    if (mealsArray.length > 0) {
      const { name, codeDish } = mealsArray.find(
        ({ dishToggle }) => dishToggle
      );

      finalDish.name = name;
      finalDish.code = codeDish;

      const mealMods = mealsArray.filter(({ modToggle }) => modToggle);

      mealMods &&
        mealMods.map(({ name, codeMod }) => {
          finalDish.modifiers.push({
            name: name,
            code: codeMod,
            count: 1,
          });
        });
    } else {
      finalDish.name = name;
      finalDish.code = code;
    }

    mods &&
      mods.map(({ name, code }) => {
        finalDish.modifiers.push({
          name: name,
          code: code,
          count: 1,
        });
      });

    adds &&
      adds.map(({ name, code, count }) => {
        finalDish.modifiers.push({
          name: name,
          code: code,
          count: count,
        });
      });

    if (breadData?.status) {
      const { name, code } = breadData;

      finalDish.modifiers.push({
        name: name,
        code: code,
        count: 1,
      });
    }

    dispatch(addToBasket(finalDish));
    setShow(!show);
  };

  const RenderComponent = () => (
    <div className={styles.container}>
      {width <= 999 && <RenderTopPanel />}
      <span className={styles.item__name}>
        {name}
        {width > 999 && (
          <button
            className={styles.button__close}
            onClick={() => setShow(false)}
          />
        )}
      </span>
      <div className={styles.content__top}>
        {breadData && renderBread(breadData, setBreadData, setBreadPrice)}
        <div className={styles.data__container}>
          {staticMeals.length > 0 && (
            <StaticMealsComponent meals={staticMeals} />
          )}
          {mealsArray.length > 0 && (
            <MealsComponent
              meals={mealsArray}
              setMeals={setMealsArray}
              setActiveMeal={setActiveMeal}
              dataDisabled={dataDisabled}
              setDataDisabled={setDataDisabled}
              setOneDishPrice={setOneDishPrice}
              setMealsPrice={setMealsPrice}
            />
          )}
          {modsArray.length > 0 && (
            <ModsComponent
              mods={modsArray}
              setMods={setModsArray}
              dataDisabled={dataDisabled}
              setModsPrice={setModsPrice}
            />
          )}
          {addsArray.length > 0 && (
            <AddsComponent
              adds={addsArray}
              setAdds={setAddsArray}
              dataDisabled={dataDisabled}
              setAddsPrice={setAddsPrice}
            />
          )}
        </div>
      </div>
      {width > 999 && <RenderBottomPanel />}
    </div>
  );

  const RenderTopPanel = () => (
    <div className={styles.mobile_top__panel}>
      <button className={styles.mobile_button__close}></button>
      <img className={styles.mobile_item__image} src={image} />
    </div>
  );

  const RenderBottomPanel = () => (
    <div className={styles.content__bottom}>
      <div className={styles.count__container}>
        <button
          className={styles.count__decrease}
          onClick={() => dishCountDecrease()}
        ></button>
        <span className={styles.count}>{dishCount}</span>
        <button
          className={styles.count__increase}
          onClick={() => dishCountIncrease()}
        ></button>
      </div>
      <button
        className={styles.add__button}
        style={dataDisabled ? { opacity: 0.5 } : {}}
        disabled={dataDisabled}
        onClick={() => {
          toBasketClickHandler();
        }}
      >{`В корзину ${totalPrice}₽`}</button>
    </div>
  );

  return width > 999 ? (
    show && (
      <PopupComponent setShow={setShow}>
        <RenderComponent />
      </PopupComponent>
    )
  ) : (
    <BottomSheet
      open={show}
      snapPoints={({ maxHeight }) => [maxHeight]}
      scrollLocking
      onDismiss={() => setShow(!show)}
      footer={<RenderBottomPanel />}
      header={<></>}
      expandOnContentDrag
    >
      <RenderComponent/>
    </BottomSheet>
  );
};
