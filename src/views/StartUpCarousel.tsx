import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ButtonPrimary from '~components/ButtonPrimary';
import {IconButton} from '~components/IconButton';
import {storage} from '~services/localStorage';
import {colors} from '~utils/colors';
import {ROUTE_NAMES} from '~utils/constants';
import {images} from '~utils/images';

type CarouselitemType = {
  image: any;
  text: string;
};

const StartUpCarousel = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dataCarousel: CarouselitemType[] = [
    {
      image: images.startUpPic_1,
      text: t('startUp.des_1'),
    },
    {
      image: images.startUpPic_2,
      text: t('startUp.des_2'),
    },
    {
      image: images.startUpPic_3,
      text: t('startUp.des_3'),
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  const onNextStep = () => {
    if (currentIndex === dataCarousel.length - 1) {
      storage.set('firstLaunch', true);
      navigate(ROUTE_NAMES.LOGIN as never);
      return;
    }
    carouselRef.current?.snapToNext();
  };

  const onPreStep = () => {
    carouselRef.current?.snapToPrev();
  };

  const _renderItem = ({
    item,
    index,
  }: {
    item: CarouselitemType;
    index: number;
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {currentIndex !== 0 ? (
            <IconButton onPress={onPreStep} style={styles.goBackBtn}>
              <FontAwesomeIcon icon={faArrowLeft} size={20} />
            </IconButton>
          ) : (
            <View />
          )}
          <ButtonPrimary
            textStyle={{color: colors.text.white}}
            onPress={onNextStep}
            text={t(
              currentIndex === dataCarousel.length - 1
                ? 'startUp.start'
                : 'startUp.nextStep',
            )}
            style={styles.button}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Carousel
        ref={carouselRef}
        scrollEnabled={false}
        onBeforeSnapToItem={index => setCurrentIndex(index)}
        layout="default"
        data={dataCarousel}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
      />
      <View style={styles.pagination}>
        <Pagination
          activeDotIndex={currentIndex}
          dotsLength={dataCarousel.length}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flex: 0.1,
  },
  goBackBtn: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: colors.primary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  image: {
    aspectRatio: 1 / 1,
    width: 300,
    height: 300,
  },
});

export default StartUpCarousel;
