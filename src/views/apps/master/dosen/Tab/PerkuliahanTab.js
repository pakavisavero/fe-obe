import React from "react";

import _ from "lodash";
import Perkuliahan from "../child/perkuliahan";

const PerkuliahanTab = ({ store, control }) => {
  return <Perkuliahan control={control} store={store} />;
};

export default PerkuliahanTab;
