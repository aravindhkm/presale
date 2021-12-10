import { store } from 'store';
import { addDialog, removeDialog } from 'store/ui/dialogs';

type ControlProps<T> = {
  onSubmit: (result: T) => void;
  onClose: VoidFunction;
};

export type DialogProps<T = void, P = {}> = ControlProps<T> & P;

export interface DialogConfiguration<T, P> {
  id: string;
  Component: React.ComponentType<DialogProps<T, P>>;
  props?: P;
}

export class Dialog<T, P> {
  id: string;

  Component: DialogConfiguration<T, P>['Component'];

  props?: P;

  constructor(id: string, Component: DialogConfiguration<T, P>['Component'], props?: P) {
    this.id = id;
    this.Component = Component;
    this.props = props;
  }

  open = async (props?: Partial<P>) =>
    new Promise<T>((resolve) => {
      store.dispatch(
        addDialog({
          id: this.id,
          Component: this.Component,
          props: {
            onSubmit: (result) => {
              resolve(result);
              store.dispatch(removeDialog(this.id));
            },
            onClose: () => {
              resolve(undefined);
              store.dispatch(removeDialog(this.id));
            },
            ...this.props,
            ...props,
          },
        }),
      );
    });

  close = () => {
    store.dispatch(removeDialog(this.id));
  };
}
