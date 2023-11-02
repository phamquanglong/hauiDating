import {StyleSheet, Text, View} from 'react-native';
import {colors} from '~utils/colors';
import RNBounceable from '@freakycoder/react-native-bounceable';
import React from 'react';
import {useGroupTagController} from '~hooks/PlantingSettings/useGroupTagController';
import {PlantingSettings} from '~components/plantingSettings/PlantingSettings';
import useHomeScreenController from '~hooks/useHomeScreenController';

export const Tag = ({
  item,
  isAtHome,
  disable,
}: {
  item: Tag;
  isAtHome?: boolean;
  disable?: boolean;
}) => {
  const {tag, onPress} = useGroupTagController();
  const {isPlant, isSuccess} = useHomeScreenController();

  return (
    <RNBounceable
      style={[
        styles.tag,
        {
          margin: disable ? 0 : 5,
          padding: disable ? 0 : 5,
          paddingHorizontal: disable ? 0 : 10,
          backgroundColor: disable
            ? 'transparent'
            : isAtHome
            ? colors.bg_opacity
            : tag.id === item.id
            ? colors.bg_yellow
            : colors.inactive,
        },
      ]}
      onPress={() =>
        !disable &&
        !isPlant &&
        !isSuccess &&
        onPress(item, isAtHome ?? false, <PlantingSettings />)
      }>
      <View
        style={[
          styles.dot,
          disable && {
            borderWidth: 1,
            borderColor: colors.white,
          },
          {backgroundColor: item.color},
        ]}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: isAtHome ? colors.text.white : undefined,
        }}>
        {item.name}
      </Text>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginEnd: 5,
  },
});
