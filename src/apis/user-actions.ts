export enum TypeHistory {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  LIKED_ME = 'liked-me',
}
export interface IUserActionRequest {
  targetUserId: number;
  action: string;
}
