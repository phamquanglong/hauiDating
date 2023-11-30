const config = {
  screens: {
    Home: {
      path: 'home',
    },
    UserDetail: {
      path: 'detail/:id',
      parse: {
        id: (id: any) => `${id}`,
      },
    },
    SetupProfile: {
      path: 'setup',
    },
    Settings: 'settings',
  },
};

const linking = {
  prefixes: ['deeplink://app'],
  config,
};

export default linking;
