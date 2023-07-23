// ** Icon imports
import Table from "mdi-material-ui/Table";
import ChartDonut from "mdi-material-ui/ChartDonut";
import FormSelect from "mdi-material-ui/FormSelect";
import CubeOutline from "mdi-material-ui/CubeOutline";
import LockOutline from "mdi-material-ui/LockOutline";
import HomeOutline from "mdi-material-ui/HomeOutline";
import EmailOutline from "mdi-material-ui/EmailOutline";
import ShieldOutline from "mdi-material-ui/ShieldOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";
import ArchiveOutline from "mdi-material-ui/ArchiveOutline";
import DotsHorizontal from "mdi-material-ui/DotsHorizontal";
import MessageOutline from "mdi-material-ui/MessageOutline";
import FormatLetterCase from "mdi-material-ui/FormatLetterCase";
import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import VectorArrangeBelow from "mdi-material-ui/VectorArrangeBelow";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";
import CalendarBlankOutline from "mdi-material-ui/CalendarBlankOutline";
import PackageVariantClosed from "mdi-material-ui/PackageVariantClosed";
import GoogleCirclesExtended from "mdi-material-ui/GoogleCirclesExtended";
import CheckboxMarkedCircleOutline from "mdi-material-ui/CheckboxMarkedCircleOutline";
// ** Icon imports
import MasterIcon from "mdi-material-ui/FolderOutline";
import SettingIcon from "mdi-material-ui/CogOutline";
import TransactionIcon from "mdi-material-ui/Receipt";
import ReportIcon from "mdi-material-ui/FileChartOutline";
import WrenchClock from "mdi-material-ui/ProgressWrench";

import { useAuth } from "src/hooks/useAuth";
import { useEffect } from "react";

const navigation = () => {
  const auth = useAuth();
  const groups = auth.groups.group;

  const ICON = {
    HomeOutline: HomeOutline,
    MasterIcon: MasterIcon,
    SettingIcon: SettingIcon,
    TransactionIcon: TransactionIcon,
    ReportIcon: ReportIcon,
  };

  var verticalList = [];

  for (var gr of groups) {
    var group = {
      title: gr.group,
      icon: ICON[gr.icon],
    };

    if (gr.group !== "Dashboard") {
      group.children = [];
      for (var mod of gr.modules) {
        group.children.push({
          title: mod.name,
          path: mod.path,
        });
      }
    } else {
      group.path = gr.path;
    }

    verticalList.push(group);
  }

  return verticalList;
};

export default navigation;
