import React from 'react';
import ListCardHistory from '~components/history/ListCardHistory';
import {useHistoryStore} from '~zustands/useHistoryStore';

export enum ActionTypes {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  LIKEDME = 'liked-me',
}

const LikedTab = () => {
  const {likedList} = useHistoryStore();

  return <ListCardHistory list={likedList} />;
};

export default LikedTab;
