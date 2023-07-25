import React from "react";

import _ from "lodash";
import Mahasiswa from "../child/mahasiswa";

const MahasiswaTab = ({ store, control }) => {
  return <Mahasiswa control={control} store={store} />;
};

export default MahasiswaTab;
