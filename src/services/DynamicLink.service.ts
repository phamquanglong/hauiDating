import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigate} from './Navigation.service';
import {ROUTE_NAMES} from '~utils/constants';
import {IUser} from '~apis/User';

export interface IDynamicLinkServices {
  //   buildLink: (id: number | string) => void;
}

export class DynamicLinkServices implements IDynamicLinkServices {
  static async buildLink(id: number | string, itemUser: IUser) {
    const link = await dynamicLinks().buildShortLink({
      link: `https://hauidating.com/id=${id.toString()}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://hauidating.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      ios: {
        bundleId: 'com.dating.haui',
      },
      android: {
        packageName: 'com.dating.haui',
      },
      analytics: {
        campaign: 'banner',
      },
      social: {
        descriptionText: itemUser.profile.bio,
        imageUrl: itemUser.images[0].imageUrl,
        title: itemUser.profile.fullName,
      },
    });

    return link;
  }

  static handleForegroundEvent = () =>
    dynamicLinks().onLink((link: any) => {
      // Handle dynamic link inside your own application
      if (link && (link.url as string).includes('/id=')) {
        navigate(ROUTE_NAMES.USERDETAIL, {
          id: (link.url as string).split('id=')[1],
          action: 'abc',
        });
      }
    });

  static handleBackgroundEvent = () =>
    dynamicLinks()
      .getInitialLink()
      .then((link: any) => {
        if (link && (link.url as string).includes('/id=')) {
          navigate(ROUTE_NAMES.USERDETAIL, {
            id: (link.url as string).split('id=')[1],
            action: 'abc',
          });
        }
      });
}
