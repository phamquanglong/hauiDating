import ApiService from '~services/axiosServices';
import {IUserActionRequest} from './user-actions';

export default class UserActionsApi {
  static getHistory(type: string) {
    return ApiService.get(`user-actions/history?type=${type}`);
  }
  static createAction(body: IUserActionRequest) {
    return ApiService.post('user-actions', body);
  }
}
