import React from 'react';
import ListCardHistory from '~components/history/ListCardHistory';
import {useHistoryStore} from '~zustands/useHistoryStore';

export enum ActionTypes {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  LIKEDME = 'liked-me',
}

const LikedTab = () => {
  const {likedMeList} = useHistoryStore();

  console.log({likedMeList});

  return <ListCardHistory list={likedMeList} />;
};

export default LikedTab;
