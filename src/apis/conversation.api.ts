import ApiService from '~services/axiosServices';

export default class ConversationApi {
  static getAllConversation() {
    return ApiService.get('conversations');
  }
}
