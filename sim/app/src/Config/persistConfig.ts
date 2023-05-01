import { configurePersistable } from 'mobx-persist-store';

configurePersistable(
  {
    storage: window.localStorage,
    stringify: false,
    debugMode: true,
  },
  { delay: 0, fireImmediately: true }
);