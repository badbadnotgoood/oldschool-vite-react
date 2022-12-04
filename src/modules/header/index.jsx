import React from 'react';

import { useWindowSize } from '@hooks';

import styles from './styles.module.sass';

import {
  LogoComponent,
  RestaurantDesktop,
  RestaurantMobile,
  UserFormComponent,
} from './components';

export const Header = (props) => {
  const delivery = 'На месте';
  const address = 'ул. Леваневского, 53а';
  const authStatus = false;
  const basketCount = 10;

  const width = useWindowSize();

  return (
    <>
      <header className={styles.header}>
        <RestaurantDesktop delivery={delivery} address={address} />
        <LogoComponent />
        <UserFormComponent authStatus={authStatus} basketCount={basketCount} />
      </header>
      {width <= 999 && (
        <RestaurantMobile delivery={delivery} address={address} />
      )}
    </>
  );
};
