import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
} from "@mui/material";

import { useState } from "react";
import axios from "src/configs/AxiosSetting";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const DialogDeactivate = ({ open, handleClose }) => {
  const router = useRouter();

  const [title, setTitle] = useState(
    "Apakah anda yakin untuk deactivate seluruh perkuliahan?"
  );
  const [statement, setStatement] = useState("");
  const [error, setError] = useState(false);

  const handleDeactivate = async () => {
    const response = await axios.post(`deactivate-all`);
    if (response.data.code === 200) {
      toast.success("Success deactivate semua perkuliahan!");
    } else {
      toast.error("Gagal deactivate semua perkuliahan!");
      if (response.data.partial) {
        setError(true);
        setTitle(
          "Oops! Tidak dapat menonaktifkan semua perkuliahan. Terdapat proses yang belum selesai pada sejumlah perkuliahan"
        );
        setStatement(
          "Apakah anda yakin untuk menonaktifkan hanya sebagian perkuliahan?"
        );
      } else {
        handleClose();
        router.reload();
      }
    }
  };

  const handleDeactivatePartial = async () => {
    await axios.post(`deactivate-partial`);
    toast.success("Success deactivate sebagian perkuliahan!");
    handleClose();
    router.reload();
  };

  return (
    <Dialog open={open} maxWidth="xs" onClose={handleClose}>
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      {error && <Divider />}
      <DialogContent>
        <Grid container spacing={1} sx={{ mb: 4 }}>
          {statement}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "left" }}>
        {error ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeactivatePartial}
          >
            Proceed
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeactivate}
          >
            Proceed
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeactivate;
