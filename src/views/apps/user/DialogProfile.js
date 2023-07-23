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
} from "@mui/material";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import schema from "src/views/apps/user/yup";

import { useForm, Controller } from "react-hook-form";
import Translations from "src/layouts/components/Translations";

import { updateUser } from "src/store/apps/setting/user";
import toast from "react-hot-toast";

const DialogProfile = ({
  user,
  openEdit,
  setOpenEdit,
  logout,
  handleEditClose,
}) => {
  const dispatch = useDispatch();

  const {
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: user.user_id,
      username: user.username,
      email: user.email,
      nip: user.nip,
    },
  });

  const handleUpdateProfile = async (data) => {
    dispatch(updateUser(data))
      .then(() => {
        setOpenEdit(false);
        logout();
      })
      .catch((err) => {
        console.log(err);
        setOpenEdit(false);
        toast.error("Username, email, or NIP is already taken!", {
          duration: 2000,
        });
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <Dialog open={openEdit} maxWidth="sm" onClose={handleEditClose}>
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: "center",
          fontSize: "1.5rem !important",
          mb: 4,
        }}
      >
        Edit User Information
      </DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name={"username"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name="username"
                      label="Username"
                      error={Boolean(errors["username"])}
                      value={value}
                      onChange={(e) => handleOnChange(e)}
                    />
                  )}
                />
                {errors["username"] && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    <Translations text={errors["username"].message} />
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name={"email"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name="email"
                      label="Email"
                      error={Boolean(errors["email"])}
                      value={value}
                      onChange={(e) => handleOnChange(e)}
                    />
                  )}
                />
                {errors["username"] && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    <Translations text={errors["email"].message} />
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name={"nip"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name="nip"
                      label="NIP"
                      error={Boolean(errors["nip"])}
                      value={value}
                      onChange={(e) => handleOnChange(e)}
                    />
                  )}
                />
                {errors["nip"] && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    <Translations text={errors["nip"].message} />
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Role" defaultValue={user.role} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Program Studi"
                defaultValue={user.prodi}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Login"
                defaultValue={user.lastLogin}
                disabled
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "left", mt: 4 }}>
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          onClick={handleSubmit(handleUpdateProfile)}
        >
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleEditClose}>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogProfile;
