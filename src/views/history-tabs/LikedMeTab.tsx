import React from 'react';
import ListCardHistory from '~components/history/ListCardHistory';
import {useHistoryStore} from '~zustands/useHistoryStore';

export enum ActionTypes {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  LIKEDME = 'liked-me',
}

const LikedMeTab = () => {
  const {likedMeList} = useHistoryStore();

  return <ListCardHistory list={likedMeList} isLikedMe />;
};

export default LikedMeTab;
