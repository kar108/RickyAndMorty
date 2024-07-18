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
  snackbar: {
    type: SnackbarType;
    message: string;
  };
  setLoading: (loading: ModalStore['loader']) => void;
  setSnackbar: (snackbar: ModalStore['snackbar']) => void;
}
