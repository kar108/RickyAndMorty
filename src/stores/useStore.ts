import { create } from 'zustand';

import { ModalStore, SnackbarType} from './types';
import { COLORS } from '../utils/constants';


export const useModal = create<ModalStore>(set => ({
  // States
  loader: {
    active: false,
    bg: COLORS.dark_overlay,
    color: COLORS.white,
  },

  // Update functions
  setLoading: (loader: ModalStore['loader']) => set({ loader }),
}));
