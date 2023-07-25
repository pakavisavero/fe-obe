import {
  Grid,
  Typography,
  CardContent,
  Divider,
  Box,
  CardActions,
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";

import CustomChip from "src/@core/components/mui/chip";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

import { useDispatch, useSelector } from "react-redux";

import MuiAvatar from "@mui/material/Avatar";
import Translations from "src/layouts/components/Translations";

import { Fragment, useCallback, useMemo, useState } from "react";
import { useAuth } from "src/hooks/useAuth";

import DialogProfile from "./DialogProfile";
import schema from "src/views/apps/user/yupPassword";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { updatePassword } from "src/store/apps/setting/user";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();

  const { logout, user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  const [visibility, setVisibility] = useState({
    old_password: true,
    new_password: true,
    confirm_new_password: true,
  });

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
    },
  });

  const handleVisibility = (name) => {
    setVisibility((prev) => ({ ...prev, [name]: !visibility[name] }));
  };

  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const displayName = useMemo(() => user.fullName, [user]);
  const generateDisplayName = useCallback(
    (name) => {
      const nameSplit = user.fullName.split(" ");
      if (nameSplit.length < 2) {
        return nameSplit[0].charAt(0).toUpperCase();
      } else {
        return (
          nameSplit[0].charAt(0).toUpperCase() +
          nameSplit[1].charAt(0).toUpperCase()
        );
      }
    },
    [displayName]
  );

  const generateRow = (key, value) => {
    return (
      <Box sx={{ display: "flex", mb: 2.7 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Typography sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}>
            {key ? key : "-"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          :
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Typography variant="body2">{value ? value : "-"}</Typography>
        </Grid>
      </Box>
    );
  };

  const rows = [
    { key: "Username", value: user.username },
    { key: "Email", value: user.email },
    { key: "NIP", value: user.nip },
    { key: "Role", value: user.role },
    { key: "Program Studi", value: user.prodi },
    { key: "Last Login", value: user.lastLogin },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleUpdatePassword = async (data) => {
    dispatch(updatePassword(data))
      .then(() => {
        logout();
      })
      .catch((err) => {
        toast.error("Wrong Password!", {
          duration: 2000,
        });
      });
  };

  return (
    <>
      {openEdit && (
        <DialogProfile
          user={user}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          logout={logout}
          handleEditClose={() => handleEditClose()}
        />
      )}

      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5} lg={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    pt: 10,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <MuiAvatar
                    sx={{
                      height: "80px",
                      width: "80px",
                      mb: 4,
                      fontSize: "32px",
                    }}
                  >
                    {generateDisplayName(displayName)}
                  </MuiAvatar>

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {displayName}
                  </Typography>
                  <CustomChip
                    skin="light"
                    size="small"
                    label={user.role}
                    color={"warning"}
                    sx={{
                      height: 20,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderRadius: "5px",
                      textTransform: "capitalize",
                      "& .MuiChip-label": { mt: -0.25 },
                    }}
                  />
                </CardContent>

                <CardContent sx={{ mt: 4 }}>
                  <Typography variant="h6">Details</Typography>
                  <Divider />
                  <Box sx={{ pt: 2, pb: 2 }}>
                    {rows.map((row) => generateRow(row.key, row.value))}
                  </Box>
                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 3 }}
                    onClick={handleEditClickOpen}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{
                    pt: 5,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader
                    title="Change Password"
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name={"old_password"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <InputLabel htmlFor="user-view-security-new-password">
                                  Old Password
                                </InputLabel>
                                <OutlinedInput
                                  label="Old Password"
                                  name={"old_password"}
                                  value={value}
                                  error={Boolean(errors["old_password"])}
                                  onChange={(e) => handleOnChange(e)}
                                  type={
                                    visibility.old_password
                                      ? "password"
                                      : "text"
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="end"
                                        onClick={(e) =>
                                          handleVisibility("old_password")
                                        }
                                        aria-label="toggle password visibility"
                                      >
                                        {visibility.old_password ? (
                                          <EyeOutline />
                                        ) : (
                                          <EyeOffOutline />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </>
                            )}
                          />
                          {errors["old_password"] && (
                            <FormHelperText sx={{ color: "error.main" }}>
                              <Translations
                                text={errors["old_password"].message}
                              />
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name={"new_password"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <InputLabel htmlFor="user-view-security-new-password">
                                  New Password
                                </InputLabel>
                                <OutlinedInput
                                  label="New Password"
                                  name={"new_password"}
                                  value={value}
                                  error={Boolean(errors["new_password"])}
                                  onChange={(e) => handleOnChange(e)}
                                  type={
                                    visibility.new_password
                                      ? "password"
                                      : "text"
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="end"
                                        onClick={(e) =>
                                          handleVisibility("new_password")
                                        }
                                        aria-label="toggle password visibility"
                                      >
                                        {visibility.new_password ? (
                                          <EyeOutline />
                                        ) : (
                                          <EyeOffOutline />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </>
                            )}
                          />
                          {errors["new_password"] && (
                            <FormHelperText sx={{ color: "error.main" }}>
                              <Translations
                                text={errors["new_password"].message}
                              />
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name={"confirm_new_password"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <InputLabel htmlFor="user-view-security-confirm-new-password">
                                  Confirm New Password
                                </InputLabel>
                                <OutlinedInput
                                  label="Confirm New Password"
                                  name={"confirm_new_password"}
                                  value={value}
                                  error={Boolean(
                                    errors["confirm_new_password"]
                                  )}
                                  type={
                                    visibility.confirm_new_password
                                      ? "password"
                                      : "text"
                                  }
                                  onChange={(e) => handleOnChange(e)}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={(e) =>
                                          handleVisibility(
                                            "confirm_new_password"
                                          )
                                        }
                                      >
                                        {visibility.confirm_new_password ? (
                                          <EyeOutline />
                                        ) : (
                                          <EyeOffOutline />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </>
                            )}
                          />
                          {errors["confirm_new_password"] && (
                            <FormHelperText sx={{ color: "error.main" }}>
                              <Translations
                                text={errors["confirm_new_password"].message}
                              />
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sx={{ mt: 5 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={handleSubmit(handleUpdatePassword)}
                        >
                          Change Password
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default Profile;
