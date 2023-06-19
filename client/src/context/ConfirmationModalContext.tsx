import React, { useState, useRef } from 'react';
import { ConfirmationModalType, IConfirmationModal } from '../types/ConfirmationModalType';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useCupidThemeProvider } from './CupidThemeProvider';

type ConfirmationModalContextType = {
  confirmationModalState: IConfirmationModal;
  showConfirmationModal: (newState: IConfirmationModal) => Promise<boolean>;
};

const ConfirmationModalContext = React.createContext<ConfirmationModalContextType>(
  {} as ConfirmationModalContextType,
);

export default ConfirmationModalContext;

export function useConfirmationModal() {
  return React.useContext(ConfirmationModalContext);
}

type Props = { children: React.ReactNode };

export const ConfirmationModalContextProvider: React.FC<Props> = ({ children }) => {
  const [confirmationModalState, setConfirmationModalState] = useState<IConfirmationModal>({
    title: '',
    message: '',
    severity: 'info',
    show: false,
  });
  const resolver = useRef<Function>();
  const { theme } = useCupidThemeProvider();

  const showConfirmationModal = (newState: IConfirmationModal): Promise<boolean> => {
    setConfirmationModalState((prevState) => ({ ...prevState, ...newState }));
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);
    setConfirmationModalState((prevState) => ({ ...prevState, show: false }));
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setConfirmationModalState((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <ConfirmationModalContext.Provider value={{ confirmationModalState, showConfirmationModal }}>
      {children}
      <Dialog
        fullWidth
        open={confirmationModalState.show}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          bgcolor={theme.severity[confirmationModalState.severity].main}
          color={theme.severity[confirmationModalState.severity].text}
        >
          {confirmationModalState.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' padding={1} fontWeight={'bold'}>
            {confirmationModalState.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleOk} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationModalContext.Provider>
  );
};
