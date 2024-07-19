import { useModal } from "../stores/useStore";
import { ModalStore, SnackbarType } from "../stores/types";

function useLoader () {
  const { loader, setLoading } = useModal();

  const start = () => setLoading({ ...loader, active: true });

  const stop = () => setLoading({ ...loader, active: false });

  const toggle = () => setLoading({ ...loader, active: !loader.active });

  const set = (data: ModalStore["loader"]) => setLoading(data);

  const setBg = (bg: string) => setLoading({ ...loader, bg });

  const setColor = (color: string) => setLoading({ ...loader, color });

  return {
    active: loader.active,
    bg: loader.bg,
    color: loader.color,
    start,
    stop,
    toggle,
    set,
    setBg,
    setColor
  }
}

function loaderConfig () {

  const { loader } = useModal.getState();
  const dispatch = useModal.setState;

  const start = () => dispatch({ loader: { ...loader, active: true } });

  const stop = () => dispatch({ loader: { ...loader, active: false } });

  const toggle = () => dispatch({ loader: { ...loader, active: !loader.active } });

  const set = (data: ModalStore["loader"]) => dispatch({ loader: data });

  const setBg = (bg: string) => dispatch({ loader: { ...loader, bg } });

  const setColor = (color: string) => dispatch({ loader: { ...loader, color } });

  return {
    active: loader.active,
    bg: loader.bg,
    color: loader.color,
    start,
    stop,
    toggle,
    set,
    setBg,
    setColor
  }
}



export {
  useLoader,
  loaderConfig,
}