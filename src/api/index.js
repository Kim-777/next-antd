import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AccessTokenKey = '2b016addd84d8b2998030b5b879affe4';

const API = {

  APIServerKeys: {
    target: 'df7bfc84836ed6e6da215198ed0e73a1',
    operation: '274ccdcc00f7fab1c22a73a60c4740ff',
    development: 'bf7d2eeeb943f337363568b316cae26b',
  },
  apiHosts: {
    operation: 'https://pilyo-api.in.actbase.io/api/v1',
    development: 'https://pilyo-api.in.actbase.io/api/v1',
  },
  stompHosts: {
    operation: 'wss://pilyo-api.in.actbase.io/api/stomp/v1/chat',
    development: 'wss://pilyo-api.in.actbase.io/api/stomp/v1/chat',
  },
  get isDev() {
    return this._isDev;
  },
  getAPIHost() {
    if (this._isDev) return this.apiHosts.development;
    else return this.apiHosts.operation;
  },
  get common() {
    // console.log('[API].common', this._common, this.getAPIHost());
    return this._common
      ? this._common
      : (this._common = axios.create({
          baseURL: this.getAPIHost(),
        }));
  },
  async setToken(accessToken) {
    API.common.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    API.common.store = {accessToken};
    await AsyncStorage.setItem(AccessTokenKey, accessToken);
  },
  async removeToken() {
    // console.log('removeToken :::');
    await AsyncStorage.removeItem(AccessTokenKey);
    delete API.common.defaults.headers.common.authorization;
    delete API.common.store;
  },

  get storageUrl() {
    return `${this.getAPIHost()}/storage`;
  },

  makeStorageUrl(fileId) {
    return `${this.storageUrl}/${fileId}`;
  },
};

export default API;
