import { FormProps, FormPropsDefaultS } from './Form';

export interface ModalFormProps<S extends FormPropsDefaultS>
  extends FormProps<S> {
  open: boolean;
}
