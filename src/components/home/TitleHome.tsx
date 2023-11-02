import {StyleSheet, Text} from 'react-native';
import {useGetTitleHome} from '~hooks/useGetTitleHome';
import {colors} from '~utils/colors';

export const TitleHome = () => {
  const {title} = useGetTitleHome();
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: colors.text.yellow,
    maxWidth: '60%',
    textAlign: 'center',
    marginBottom: 30,
  },
});
