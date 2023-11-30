import ApiService from '~services/axiosServices';

export default class MessagesApi {
  static getAllMessageOfConversation(conversationId: number) {
    return ApiService.get(`messages/${conversationId}`);
  }
  static postMessage(body: {conversationId: number; message: string}) {
    return ApiService.post('messages', body);
  }
  static updateMessage(
    conversationId: number,
    body: {isSeen?: boolean; userDelete?: number},
  ) {
    return ApiService.patch(`messages/${conversationId}`, body);
  }
}
