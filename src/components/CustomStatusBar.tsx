import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// @ts-ignore
// @ts-ignore
export const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'dark-content',
}: {
  backgroundColor?: string;
  barStyle?: any;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};
