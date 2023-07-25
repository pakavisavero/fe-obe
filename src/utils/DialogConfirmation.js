import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Divider,
} from "@mui/material";

const DialogConfirmation = ({ title, callbackFunc, open, handleClose }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: "center",
          fontSize: "1.5rem !important",
        }}
      >
        {title}
      </DialogTitle>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={callbackFunc} size="medium" variant="contained">
          Confirm
        </Button>
        <Button
          onClick={handleClose}
          size="medium"
          variant="outlined"
          sx={{ mr: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmation;
