import React from 'react';
import {FlatList, View} from 'react-native';
import {useGroupTagController} from '~hooks/PlantingSettings/useGroupTagController';
import {TitleCustom} from '~components/TitleCustom';
import {Tag} from '~components/plantingSettings/Tag';

export const GroupTag = () => {
  const {tags, t} = useGroupTagController();

  const renderItem = ({item}: {item: Tag}) => {
    return <Tag item={item} />;
  };

  return (
    <View style={{flex: 1}}>
      <TitleCustom
        title={t.do('home.plantingSettings.tags')}
        plantingSettings
      />
      <FlatList
        data={tags}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
