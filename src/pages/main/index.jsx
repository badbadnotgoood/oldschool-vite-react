import React, { useState, useRef, useEffect, createRef } from 'react';

import { Header } from '@modules/header';
import { CategoryComponent } from './components';
import { MenuComponent } from './components';

import menuMock from './components/menu-component/mocks/menu';
import categoriesMock from './components/category-component/mocks/categories';

import styles from './styles.module.sass';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

const getCategories = (menu) => {
  if (menu.length > 0) {
    return menu.map(({ name }) => name);
  }

  return [];
};

const getRefsArray = (array, data) => {
  if (data.length > 0 && array.current.length !== data.length) {
    array.current = Array(data.length)
      .fill()
      .map((_, i) => array.current[i] || createRef());
  }
};

export const Main = (props) => {
  const { data: { menu = [] } = {} } = props;
  useDispatch

  const [data, setData] = useState(menu);

  const [activeSection, setActiveSection] = useState('section-0');
  const [scrollStatus, setScrollStatus] = useState(true);

  const sectionsContainerRef = useRef();
  const categoriesContainerRef = useRef();
  const categoriesRefs = useRef([]);
  const sectionsRefs = useRef([]);

  const categories = getCategories(data);

  getRefsArray(categoriesRefs, categories);
  getRefsArray(sectionsRefs, data);

  const params = {
    categoriesContainerRef: categoriesContainerRef,
    sectionsContainerRef: sectionsContainerRef,
    categoriesRefs: categoriesRefs,
    sectionsRefs: sectionsRefs,
    scrollStatus: scrollStatus,
    setScrollStatus: setScrollStatus,
    activeSection: activeSection,
    setActiveSection: setActiveSection,
  };

  return (
    <>
      <Header />
      <button onClick={() => setData(menuMock)}>кнопка</button>
      <CategoryComponent {...params} data={categories} />
      <MenuComponent {...params} data={data} />
    </>
  );
};
