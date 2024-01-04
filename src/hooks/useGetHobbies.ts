import {useTranslation} from 'react-i18next';
import {colors} from '~utils/colors';

export const useGetHobbies = () => {
  const {t} = useTranslation();

  const items = [
    {
      id: 0,
      name: t('setupProfile.hobbiesTypes.hiking'),
    },
    {
      id: 1,
      name: t('setupProfile.hobbiesTypes.traveling'),
    },
    {
      id: 2,
      name: t('setupProfile.hobbiesTypes.cooking'),
    },
    {
      id: 3,
      name: t('setupProfile.hobbiesTypes.photography'),
    },
    {
      id: 4,
      name: t('setupProfile.hobbiesTypes.reading'),
    },
    {
      id: 5,
      name: t('setupProfile.hobbiesTypes.swimming'),
    },
    {
      id: 6,
      name: t('setupProfile.hobbiesTypes.running'),
    },
    {
      id: 7,
      name: t('setupProfile.hobbiesTypes.painting'),
    },
    {
      id: 8,
      name: t('setupProfile.hobbiesTypes.yoga'),
    },
    {
      id: 9,
      name: t('setupProfile.hobbiesTypes.gaming'),
    },
    {
      id: 10,
      name: t('setupProfile.hobbiesTypes.soccer'),
    },
  ];

  const getHobbies = (id: number) => {
    return items.find(
      i =>
        i.id ===
        (id > 10
          ? Number(id.toString().split('')[id.toString().length - 1])
          : id),
    );
  };

  const getBgColor = (index: number) => {
    switch (index) {
      case 1:
        return colors.bg_yellow;
      case 2:
        return colors.bg_light_blue;
      case 3:
        return colors.bg_light_red;
      case 4:
        return colors.bg_light_green;
      default:
        return colors.bg_light_gray;
    }
  };

  return {
    hobbies: items,
    getHobbies,
    getBgColor,
  };
};
