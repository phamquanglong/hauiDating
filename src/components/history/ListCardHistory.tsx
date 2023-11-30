import React from 'react';
import {FlatList, View} from 'react-native';
import {IUser} from '~apis/User';
import {colors} from '~utils/colors';
import {width} from '~utils/commons';
import CardHistory from './CardHistory';
interface ListCardHistoryProps {
  list: any[];
}

const ListCardHistory = ({list}: ListCardHistoryProps) => {
  const _renderItem = ({item}: {item: any}) => {
    const targetUser: IUser = item?.targetUser ?? item;
    return targetUser ? (
      <CardHistory targetUser={targetUser} action={item.action} />
    ) : (
      <View style={{width: width * 0.45}} />
    );
  };
  return (
    <FlatList
      style={{
        backgroundColor: colors.white,
        flex: 1,
        paddingVertical: 20,
      }}
      data={list}
      renderItem={_renderItem}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
    />
  );
};

export default ListCardHistory;
