import React from 'react';
import ListCardHistory from '~components/history/ListCardHistory';
import {useHistoryStore} from '~zustands/useHistoryStore';

const DislikedTab = () => {
  const {dislikedList} = useHistoryStore();
  return <ListCardHistory list={dislikedList} />;
};

export default DislikedTab;
