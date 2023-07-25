import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

import axios from "src/configs/AxiosSetting";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";

const DialogRole = ({ value, openEdit, setValue, handleEditClose }) => {
  const [roles, setRoles] = useState([]);
  const { user } = useAuth();

  const getRoles = async () => {
    const token = getCookie("token");
    const response = await axios.get(`role-masters`, {
      headers: { token },
    });

    setRoles(response.data.data);
  };

  const getChecked = (id) => {
    const filter = value.filter((val) => val.id === id)[0];
    if (filter) return true;
    return false;
  };

  const handleChange = (role) => setValue("roles", [...value, role]);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Dialog
        open={openEdit}
        maxWidth="sm"
        fullWidth={true}
        onClose={handleEditClose}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: "center",
            fontSize: "1.5rem !important",
          }}
        >
          Manage Role
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            {roles.map((role) => (
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={getChecked(role.id)}
                      disabled={getChecked(role.id) || role.id <= user.role_id}
                      onChange={() => handleChange(role)}
                    />
                  }
                  label={
                    <>
                      <span>{role.role_name}</span>
                    </>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogRole;
