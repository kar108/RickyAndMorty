export enum SnackbarType {
  NONE,
  SUCCESS,
  ERROR,
  INFO,
}

export interface ModalStore {
  loader: {
    active: boolean;
    bg: string;
    color: string;
  };

  setLoading: (loading: ModalStore['loader']) => void;
}
