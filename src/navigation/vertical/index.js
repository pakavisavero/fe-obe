// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";

// ** Icon imports
import MasterIcon from "mdi-material-ui/FolderOutline";
import SettingIcon from "mdi-material-ui/CogOutline";
import TransactionIcon from "mdi-material-ui/Receipt";
import ReportIcon from "mdi-material-ui/FileChartOutline";

import { useAuth } from "src/hooks/useAuth";

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
