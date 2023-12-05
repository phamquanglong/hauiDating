import {AxiosResponse} from 'axios';
import {
  IUpdateUserInformationRequest,
  IUser,
  IUserInformationRequest,
} from './User';
import ApiService from '~services/axiosServices';

export default class UserApi {
  static getInfo(): Promise<AxiosResponse<IUser>> {
    return ApiService.get('users/me');
  }

  static pushNotification(id: any, body: {title: string; body: string}) {
    return ApiService.post(`users/noti/${id}`, body);
  }

  static postNotificationToken(body: {
    token: string;
  }): Promise<AxiosResponse<IUser>> {
    return ApiService.post('users/notitoken', body);
  }

  static getInfoById(id: string): Promise<AxiosResponse<IUser>> {
    return ApiService.get(`users/${id}`);
  }

  static register(body: {userName: string; email: string; password: string}) {
    return ApiService.post('auth/register', body);
  }

  static login(body: {userName: string; password: string}) {
    return ApiService.post('auth/login', body);
  }

  static uploadImage(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return ApiService.post('users/upload', formData);
  }

  static postUserInformation(
    body: IUserInformationRequest,
  ): Promise<AxiosResponse<IUser>> {
    return ApiService.post('users/information', body);
  }

  static updateUserInformation(
    body: IUpdateUserInformationRequest,
  ): Promise<AxiosResponse<IUser>> {
    return ApiService.patch('users/information', body);
  }

  static getSuggestUser(): Promise<AxiosResponse<IUser[]>> {
    return ApiService.get('users/suggest');
  }
}
