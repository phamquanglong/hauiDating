export interface IUserInformationRequest {
  profile: IProfile;
  hobbies: number[];
  images: string[];
  settings: ISettings;
}
export interface IUpdateUserInformationRequest {
  profile?: IProfile;
  hobbies?: number[];
  images?: string[];
  settings?: ISettings;
}

export interface IProfile {
  fullName: string;
  gender: string;
  birthday: string;
  bio: string;
  reputational: number;
  latitude: number;
  longitude: number;
}

export interface ISettings {
  distance: number[];
  gender: string;
  old: number[];
}

export interface IUser {
  createdAt: string;
  email: string;
  id: number;
  images: IImage[];
  password: string;
  profile: IProfile;
  settings: ISetting;
  updatedAt: string;
  userHobbies: IUserHobby[];
  userName: string;
}

export interface IImage {
  createdAt: string;
  id: number;
  imageUrl: string;
  updatedAt: string;
}

export interface IUserHobby {
  createdAt: string;
  hobby: {
    createdAt: string;
    id: number;
    imageUrl: string;
    name: string;
    updatedAt: string;
  };
  id: number;
  updatedAt: string;
}

export interface ISetting {
  createdAt: string;
  distance: number[];
  gender: string;
  id: number;
  old: number[];
}
