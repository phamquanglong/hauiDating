import {
  CommonActions,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import {find} from 'lodash';
import {ROUTE_NAMES} from '~utils/constants';

export enum NAVIGATE_ACTION {
  NAVIGATE = 'NAVIGATE',
  REPLACE = 'REPLACE',
  POP = 'POP',
  PUSH = 'PUSH',
  GO_BACK = 'GO_BACK',
}

let _navigator: any;
let _currentAction: NAVIGATE_ACTION;

function setTopLevelNavigator(navigator: any) {
  _navigator = navigator;
}

function addListenerAction() {
  return _navigator.addListener('__unsafe_action__', (action: any) => {
    _currentAction = action?.data?.action?.type;
  });
}

function addListener(event: any, callback: any) {
  return _navigator.addListener(event, callback);
}

function removeListener(event: any, callback: any) {
  return _navigator.removeListener(event, callback);
}

function navigate(name: ROUTE_NAMES, params?: any) {
  _currentAction = NAVIGATE_ACTION.NAVIGATE;
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params: params || {},
    }),
  );
}

function reset(name: any, params?: any) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params: params || {},
        },
      ],
    }),
  );
}

function pop() {
  _currentAction = NAVIGATE_ACTION.POP;
  _navigator.dispatch(CommonActions.goBack());
}

function goBack(key?: ROUTE_NAMES | null) {
  _navigator.dispatch((state: any) => {
    return {
      ...CommonActions.goBack(),
      source: key,
      target: find(state.routes, ['name', key]),
    };
  });
}

function popMany(number: number) {
  _navigator.isReady() && _navigator.dispatch(StackActions.pop(number));
}

function popToTop() {
  _navigator.isReady() && _navigator.dispatch(StackActions.popToTop());
}

function replace(routeName: ROUTE_NAMES, params?: any) {
  _navigator.isReady() &&
    _navigator.dispatch(StackActions.replace(routeName, params));
}

function getCurrentRoute() {
  let route: any = _navigator.getCurrentRoute();
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
}

function getCurrentAction() {
  return _currentAction;
}

function push(name: ROUTE_NAMES, params?: any) {
  _navigator.isReady() && _navigator.dispatch(StackActions.push(name, params));
}

function jumpTo(name: ROUTE_NAMES, params?: any) {
  _navigator.isReady() && _navigator.dispatch(TabActions.jumpTo(name, params));
}

export {
  addListener,
  addListenerAction,
  getCurrentAction,
  getCurrentRoute,
  goBack,
  jumpTo,
  navigate,
  pop,
  popMany,
  popToTop,
  push,
  removeListener,
  replace,
  reset,
  setTopLevelNavigator,
};
