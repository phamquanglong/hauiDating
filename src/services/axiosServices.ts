import axios from 'axios';
import {get} from 'lodash';
import {Alert} from 'react-native';
import {storage} from './localStorage';
import {URL} from '~utils/constants';

const ApiService = axios.create({
  baseURL: `http://${URL}:9000`,
  timeout: 30000,
});

ApiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (get(error, 'response.status') === 400) {
      const data = get(error, 'response.data');
      if (data) {
        Alert.alert(data.message);
      } else {
        Alert.alert(get(error, 'message'));
      }
    } else if (get(error, 'response.status') === 401) {
      Alert.alert('Phiên làm việc hết hạn. Vui lòng làm mới ứng dụng');
      window.location.href = '/login';
    } else if (get(error, 'response.status') >= 500) {
      Alert.alert('Máy chủ gặp sự cố. Vui lòng thử lại sau');
    }

    return Promise.reject(error);
  },
);

if (storage.getString('accessToken')) {
  ApiService.defaults.headers.common.Authorization =
    'Bearer ' + storage.getString('accessToken');
}

export default ApiService;
