import { Tree } from "antd";
import {
  FormOutlined,
  TableOutlined,
  FilterOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const FormIcon = FormOutlined;
const TableIcon = TableOutlined;
const ViewIcon = FilterOutlined;
const ColumnIcon = NumberOutlined;

export const MyTree = (props) => {
  class Node {
    constructor(title, icon, systemName, publicBoolean) {
      this.title = title;
      this.key = randomKeyGenerator();
      this.icon = icon;
      this.systemName = systemName;
      this.public = publicBoolean;
      this.children = [];
    }
  }

  let randomKeyGenerator = () => {
    return Math.floor(Math.random() * 100000);
  }

  let transformedData = [];
  let transformDataFunction = (data, displaySystemName) => {
    for (let i = 0; i < data.length; i++) {
      let dataDisplayName = displaySystemName ? data[i].displayName + " (" + data[i].systemName + ")" : data[i].displayName;
      let newData = new Node(dataDisplayName, null, data[i].systemName, data[i].public);

      for (let j = 0; j < data[i].tables.length; j++) {
        let tableDisplayName = displaySystemName ? data[i].tables[j].displayName + " (" + data[i].tables[j].systemName + ")" : data[i].tables[j].displayName;
        let newTable = new Node(tableDisplayName, <TableIcon />, data[i].tables[j].systemName, data[i].tables[j].public);

        let newForm = new Node("Forms", null, null, true);
        for (let k = 0; k < data[i].tables[j].forms.length; k++) {
          let childFormDisplayName = displaySystemName ? data[i].tables[j].forms[k].displayName + " (" + data[i].tables[j].forms[k].systemName + ")" : data[i].tables[j].forms[k].displayName;
          let childForms = new Node(childFormDisplayName, <FormIcon />, data[i].tables[j].forms[k].systemName, data[i].tables[j].forms[k].public);
          newForm["children"].push(childForms);
        }
        newTable["children"].push(newForm);
        let newColumn = new Node("Columns", null, null, true);
        for (let l = 0; l < data[i].tables[j].columns.length; l++) {
          let childColDisplayName = displaySystemName ? data[i].tables[j].columns[l].displayName + " (" + data[i].tables[j].columns[l].systemName + ")" : data[i].tables[j].columns[l].displayName;
          let childColumns = new Node(childColDisplayName, <ColumnIcon />, data[i].tables[j].columns[l].systemName, null);
          newColumn["children"].push(childColumns);
        }
        newTable["children"].push(newColumn);
        let newView = new Node("Views", null, null, true);
        for (let m = 0; m < data[i].tables[j].views.length; m++) {
          let childViewDisplayName = displaySystemName ? data[i].tables[j].views[m].displayName + " (" + data[i].tables[j].views[m].systemName + ")" : data[i].tables[j].views[m].displayName;
          let childViews = new Node(childViewDisplayName, <ViewIcon />, data[i].tables[j].views[m].systemName, data[i].tables[j].views[m].public);
          newView["children"].push(childViews);
        }
        newTable["children"].push(newView);
        newData["children"].push(newTable);
      }
      transformedData.push(newData);
    }
    return transformedData;
  }

  if (props.transform === true) {
    return <Tree showIcon={props.showIcon} treeData={props.data} autoExpandParent={true} />;
  } else {
    let treeData = (props.displaySystemName === true) ? transformDataFunction(props.data, true) : transformDataFunction(props.data, false)
    if (props.treeUpdate) {
      props.treeUpdate(treeData);
    }
    return <Tree showIcon={props.showIcon} treeData={treeData} autoExpandParent={true} />;
  }
};



