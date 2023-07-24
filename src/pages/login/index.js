// ** React Imports
import { useState } from "react";

// ** Next Imports
import Link from "next/link";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// ** MUI Components
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import useBgColor from "src/@core/hooks/useBgColor";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import toast from "react-hot-toast";

import HomeOutline from "mdi-material-ui/HomeOutline";

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "35rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: "",
  email: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleModalClickOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const bgClasses = useBgColor();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      role_id: 0,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password, role_id } = data;
    auth
      .login({ email, password, role_id }, (message) => {
        toast.error(message);
      })
      .then((res) => {
        // console.log("res");
        // console.log(res);
        setRoles(res);
        setValue("role_id", res[0].id);
        handleModalClickOpen();
      })
      .catch((err) => {
        // console.log("masuk 2");
      });
  };
  const imageSource =
    skin === "bordered"
      ? "auth-v2-login-illustration-bordered"
      : "auth-v2-login-illustration";

  return (
    <>
      {openModal && (
        <Dialog
          open={openModal}
          maxWidth="xs"
          fullWidth={true}
          onClose={handleModalClose}
          sx={{ maxWidth: "100%" }}
        >
          <DialogTitle
            id="user-view-edit"
            sx={{
              textAlign: "center",
              fontSize: "1.5rem !important",
              mb: 4,
            }}
          >
            Select Role
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={6}>
              {roles.map((role) => (
                <Grid item sm={6} xs={12}>
                  <Box
                    onClick={() => setValue("role_id", role.id)}
                    sx={{
                      py: 2,
                      px: 4,
                      borderRadius: 1,
                      cursor: "pointer",
                      border: (theme) =>
                        `1px solid ${
                          watch("role_id") === role.id
                            ? theme.palette.primary.main
                            : theme.palette.divider
                        }`,
                      ...(watch("role_id") === role.id
                        ? { ...bgClasses.primaryLight }
                        : { backgroundColor: "action.hover" }),
                    }}
                  >
                    {role.role_name}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "left", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Select
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Box className="content-right">
        {!hidden ? (
          <Box
            component="img"
            sx={{
              flex: 1,
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
            src={`/images/bg_undip.jpeg`}
          >
            {/* <FooterIllustrationsV2 /> */}
          </Box>
        ) : null}

        <RightWrapper
          sx={
            skin === "bordered" && !hidden
              ? { borderLeft: `1px solid ${theme.palette.divider}` }
              : {}
          }
        >
          <Box
            sx={{
              p: 12,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
            }}
          >
            <BoxWrapper>
              <Box
                component="img"
                sx={{
                  flex: 1,
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "120px",
                  marginX: "auto",
                  marginBottom: "70px",
                }}
                src={`/images/logo_undip.jpeg`}
              >
                {/* <FooterIllustrationsV2 /> */}
              </Box>

              <Box
                sx={{
                  top: 30,
                  left: 40,
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <svg
                width={35}
                height={29}
                version="1.1"
                viewBox="0 0 30 23"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    id="Artboard"
                    transform="translate(-95.000000, -51.000000)"
                  >
                    <g id="logo" transform="translate(95.000000, 50.000000)">
                      <path
                        id="Combined-Shape"
                        fill={theme.palette.primary.main}
                        d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="22.7419355 8.58870968 30 12.7417372 30 16.9537453"
                        transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="22.7419355 8.58870968 30 12.6409734 30 15.2601969"
                        transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "
                      />
                      <path
                        id="Rectangle"
                        fillOpacity="0.15"
                        fill={theme.palette.common.white}
                        d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"
                      />
                      <path
                        id="Rectangle"
                        fillOpacity="0.35"
                        fill={theme.palette.common.white}
                        transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) "
                        d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"
                      />
                    </g>
                  </g>
                </g>
              </svg> */}
                <Box
                  component="img"
                  sx={{
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "90px",
                  }}
                  src={`/images/obe_image.png`}
                >
                  {/* <FooterIllustrationsV2 /> */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "1.5rem !important",
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <Box sx={{ mb: 12 }}>
                <TypographyStyled variant="h5">
                  Welcome to {themeConfig.templateName}! 👋🏻
                </TypographyStyled>
                <Typography variant="body2">
                  Please sign-in to your account and start the adventure
                </Typography>
              </Box>
              {/* <Alert icon={false} sx={{ py: 3, mb: 6, ...bgClasses.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                Admin: <strong>admin@materio.com</strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                Client: <strong>client@materio.com</strong> / Pass: <strong>client</strong>
              </Typography>
            </Alert> */}

              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="Email"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder=""
                      />
                    )}
                  />
                  {errors.email && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="auth-login-v2-password"
                    error={Boolean(errors.password)}
                  >
                    Password
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        value={value}
                        onBlur={onBlur}
                        label="Password"
                        onChange={onChange}
                        id="auth-login-v2-password"
                        error={Boolean(errors.password)}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: "error.main" }} id="">
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                  />
                  <Link passHref href="/forgot-password">
                    <LinkStyled>Forgot Password?</LinkStyled>
                  </Link>
                </Box>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mb: 7 }}
                >
                  Login
                </Button>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </>
  );
};

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
LoginPage.guestGuard = true;

export default LoginPage;
