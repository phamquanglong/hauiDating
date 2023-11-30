import {StoreApi, UseBoundStore, create} from 'zustand';
import {IProfile, ISetting, IUserHobby} from '~apis/User';

export interface EditInfoType {
  email?: string;
  id?: number;
  images?: string[];
  password?: string;
  profile?: IProfile;
  settings?: ISetting;
  updatedAt?: string;
  userHobbies?: IUserHobby[];
  userName?: string;
}

interface EditInfoStore {
  editInfo: EditInfoType | null;
  setEditInfo: (value: EditInfoType) => void;
}

export const useEditInfoStore: UseBoundStore<StoreApi<EditInfoStore>> = create(
  set => ({
    editInfo: null,
    setEditInfo: (value: EditInfoType) => set({editInfo: value}),
  }),
);
