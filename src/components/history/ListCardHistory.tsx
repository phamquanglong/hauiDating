import React from 'react';
import {FlatList, View} from 'react-native';
import {IUser} from '~apis/User';
import {colors} from '~utils/colors';
import {height, width} from '~utils/commons';
import CardHistory from './CardHistory';
import Empty from '~components/Empty';
interface ListCardHistoryProps {
  list: any[];
  isLikedMe?: boolean;
}

const ListCardHistory = ({list, isLikedMe}: ListCardHistoryProps) => {
  const _renderItem = ({item}: {item: any}) => {
    const targetUser: IUser = isLikedMe ? item?.user : item?.targetUser ?? item;
    return targetUser ? (
      <CardHistory targetUser={targetUser} action={item.action} />
    ) : (
      <View style={{width: width * 0.48}} />
    );
  };
  return (
    <FlatList
      style={{
        backgroundColor: colors.white,
        // flex: 1,
      }}
      data={list}
      renderItem={_renderItem}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
      contentContainerStyle={{
        paddingVertical: 20,
      }}
      ListEmptyComponent={
        <View style={{height: height}}>
          <Empty />
        </View>
      }
    />
  );
};

export default ListCardHistory;
