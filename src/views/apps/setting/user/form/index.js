import React, { useEffect, useState } from "react";
import { CardContent, Grid, Button, Box } from "@mui/material";

import { DrawField } from "src/utils/field";
import { useDispatch, useSelector } from "react-redux";
import { fetchData as fetchDataProdi } from "src/store/apps/master/prodi";

import UserTab from "../Tab/UserTab";
import DialogRole from "./DialogRole";

import _ from "lodash";

const Index = ({ watch, control, errors, isEdit, setValue }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    prodi: false,
  });

  const handleOpen = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleClose = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleChangeOpen = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const [visibility, setVisibility] = useState({
    old_password: true,
    new_password: true,
    confirm_new_password: true,
  });

  const { data: dataProdi, loading: loadingProdi } = useSelector(
    (state) => state.prodi
  );

  useEffect(() => {
    dispatch(fetchDataProdi({ is_active: true }));
  }, [dispatch]);

  const handleChangeAutoComplete = (name, opt) => (event, newValue) => {
    const nameSplit = name.split("_name");
    if (newValue) {
      setValue(name, newValue);
      setValue(nameSplit[0], newValue.id);
    } else {
      setValue(name, { [opt]: "" });
      setValue(nameSplit[0], "");
    }
  };

  const handleVisibility = (name) =>
    setVisibility((prev) => ({ ...prev, [name]: !visibility[name] }));

  useEffect(() => {
    if (!watch("old_password")) {
      setValue("new_password", "");
      setValue("confirm_new_password", "");
    }
  }, [watch("old_password")]);

  const fields = [
    {
      name: "nip",
      type: "text",
      label: "NIP",
      xs: 12,
      md: 4,
    },
    {
      name: "full_name",
      type: "text",
      label: "Nama Lengkap",
      xs: 12,
      md: 4,
    },
    {
      name: "username",
      type: "text",
      label: "Username",
      autoComplete: "off",
      xs: 12,
      md: 4,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      xs: 12,
      md: 4,
    },
    {
      key: "prodi_id",
      name: "prodi_id_name",
      type: "autocomplete",
      label: "Program Studi",
      xs: 12,
      md: 4,
      data: _.sortBy(dataProdi, ["prodi"]),
      loading: loadingProdi,
      optLabel: "prodi",
      open: open.prodi,
      handleOpen: handleOpen("prodi"),
      handleClose: handleClose("prodi"),
      changeOpen: handleChangeOpen("prodi"),
      onChange: handleChangeAutoComplete("prodi_id_name", "prodi"),
    },
    {
      name: "is_active",
      type: "select",
      label: "Status",
      xs: 12,
      md: 4,
      opt: [
        {
          value: true,
          label: "Active",
        },
        {
          value: false,
          label: "Inactive",
        },
      ],
    },
  ];

  if (isEdit) {
    fields.splice(
      3,
      0,
      {
        name: "old_password",
        type: "password",
        label: "Old Password",
        visibility: visibility.old_password,
        handleVisibility: handleVisibility,
        xs: 12,
        md: 4,
        helperText: true,
        helperMessage:
          "[Jika dikosongkan akan menggunakan password sebelumnya]",
      },
      {
        name: "new_password",
        type: "password",
        label: "New Password",
        visibility: visibility.new_password,
        handleVisibility: handleVisibility,
        xs: 12,
        md: 4,
        disabled: watch("old_password") ? false : true,
      },
      {
        name: "confirm_new_password",
        type: "password",
        label: "Password Confirmation",
        visibility: visibility.confirm_new_password,
        handleVisibility: handleVisibility,
        xs: 12,
        md: 4,
        disabled: watch("old_password") ? false : true,
      }
    );
  }

  if (!isEdit) {
    fields.splice(
      3,
      0,
      {
        name: "password",
        type: "password",
        label: "Password",
        visibility: visibility.new_password,
        handleVisibility: handleVisibility,
        xs: 12,
        md: 4,
      },
      {
        name: "confirm_password",
        type: "password",
        label: "Password Confirmation",
        visibility: visibility.confirm_new_password,
        handleVisibility: handleVisibility,
        xs: 12,
        md: 4,
      }
    );
  }

  return (
    <>
      {openEdit && (
        <DialogRole
          value={watch("roles")}
          setValue={setValue}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          handleEditClose={() => handleEditClose()}
        />
      )}

      <CardContent>
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {fields.map((field, key) => DrawField(field, errors, control, key))}
        </Grid>

        <Box
          sx={{
            p: 5,
            pb: 3,
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            color={"info"}
            size="xs"
            onClick={handleEditClickOpen}
            style={{
              borderRadius: 35,
            }}
          >
            Manage Role
          </Button>
        </Box>

        <UserTab
          watch={watch}
          isEdit={isEdit}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </CardContent>
    </>
  );
};

export default Index;
