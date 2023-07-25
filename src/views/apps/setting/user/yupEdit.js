import * as yup from "yup";
const schema = yup.object().shape(
  {
    nip: yup
      .string()
      .required("NIP is a required field")
      .min(15, "NIP must be greater than 15 digits"),
    full_name: yup.string().required("Nama Lengkap is a required field"),
    username: yup
      .string()
      .required("Username is a required field")
      .typeError("Username is not valid"),
    email: yup
      .string()
      .email()
      .required("Email is a required field")
      .typeError("Email is not valid"),
    old_password: yup
      .string()
      .nullable()
      .notRequired()
      .when("old_password", {
        is: (value) => value?.length,
        then: (rule) =>
          rule.min(6, "Old Password must be 6 digits or greater!"),
      }),
    new_password: yup.string().when("old_password", {
      is: (val) => val,
      then: yup
        .string()
        .required("New Password is required!")
        .min(6, "New Password must be 6 digits or greater!")
        .typeError("New Password is not valid"),
      otherwise: yup.string().notRequired(),
    }),
    confirm_new_password: yup.string().when("new_password", {
      is: (val) => val,
      then: yup
        .string()
        .required("Confirm New Password is required!")
        .oneOf(
          [yup.ref("new_password"), null],
          "Confirm New Password must match"
        )
        .typeError("Confirm New Password is not valid"),
      otherwise: yup.string().notRequired(),
    }),
    prodi_id: yup
      .number()
      .required("Program Studi is a required field")
      .typeError("Program Studi is not valid"),
    is_active: yup.bool().required(),
  },
  [["old_password", "old_password"]]
);

export default schema;
