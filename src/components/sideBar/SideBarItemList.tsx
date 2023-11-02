import {FlatList, StyleSheet} from 'react-native';
import {siderBarItems} from '~utils/constants';
import ButtonPrimary from '~components/ButtonPrimary';
import {colors} from '~utils/colors';
import {useNavigation} from '@react-navigation/native';

export const SideBarItemList = () => {
  const navigaiton = useNavigation();

  const renderItem = ({item}: any) => {
    return (
      <ButtonPrimary
        text={item.name}
        icon={item.icon}
        textStyle={styles.textItem}
        style={styles.item}
        onPress={() => navigaiton.navigate(item.name)}
      />
    );
  };

  return <FlatList data={siderBarItems} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  item: {width: '100%', padding: 10, paddingStart: 30},
  textItem: {color: colors.text.white, fontWeight: '400', fontSize: 16},
});
