import React from 'react';
import {TranslateService} from './languages';

export const services = {
  t: new TranslateService(),
};
type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
// const Provider = servicesContext.Provider;
// export const ServicesProvider = ({children}: any) => (
//   <Provider value={services}>{children}</Provider>
// );

export const useServices = (): ContextServices =>
  React.useContext(servicesContext);

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};
