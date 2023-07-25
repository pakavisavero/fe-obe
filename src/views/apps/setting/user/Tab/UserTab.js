import React from "react";

import _ from "lodash";
import User from "../child/user";

const UserTab = ({ watch, store, control, isEdit, setValue }) => {
  return (
    <User
      control={control}
      store={store}
      value={watch("roles")}
      setValue={setValue}
      isEdit={isEdit}
    />
  );
};

export default UserTab;
