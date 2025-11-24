import { Snackbar, Alert, type SnackbarOrigin } from '@mui/material';
import '@/style/Main.css';

interface NotificationProps extends SnackbarOrigin {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}

const Notification = ({
  open,
  message,
  severity,
  onClose,
  vertical = 'bottom',
  horizontal = 'center',
  autoHideDuration = 6000,
}: NotificationProps) => {

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      key={vertical + horizontal}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          bgcolor: 'var(--button-text)',
          color: severity === 'success' ? 'var(--text-notification)' : severity === 'error' ? '#ef233c' : undefined,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;