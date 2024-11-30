import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TUserLoginResponse } from '../../api/userLoginPostFetch';

type UserStoreState = Omit<TUserLoginResponse, 'message'>;
type UserStoreActions = {
  setToken: (token: PropType<TUserLoginResponse, 'token'>) => void;
};

type TUserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      token: '',

      setToken: (token) => set({ token }),
    }),
    { name: 'auth' },
  ),
);
