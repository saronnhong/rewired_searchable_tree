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
      this.key = randomKey();
      this.icon = icon;
      this.systemName = systemName;
      this.public = publicBoolean;
      this.children = [];
    }
  }

  let randomKey = () => {
    return Math.floor(Math.random() * 10000);
  }

  let transformedData = [];
  let transformDataFunction = (data) => {
    for (let i = 0; i < data.length; i++) {
      let newData = new Node(data[i].displayName, null, data[i].systemName, data[i].public);
      for (let j = 0; j < data[i].tables.length; j++) {
        let newTable = new Node(data[i].tables[j].displayName, <TableIcon />, data[i].tables[j].systemName, data[i].tables[j].public);

        let newForm = new Node("Forms", null, null, true);
        for (let k = 0; k < data[i].tables[j].forms.length; k++) {
          let childForms = new Node(data[i].tables[j].forms[k].displayName, <FormIcon />, data[i].tables[j].forms[k].systemName, data[i].tables[j].forms[k].public);
          newForm["children"].push(childForms);
        }
        newTable["children"].push(newForm);
        let newColumn = new Node("Columns", null, null, true);
        for (let l = 0; l < data[i].tables[j].columns.length; l++) {
          let childColumns = new Node(data[i].tables[j].columns[l].displayName, <ColumnIcon />, data[i].tables[j].columns[l].systemName, null);
          newColumn["children"].push(childColumns);
        }
        newTable["children"].push(newColumn);
        let newView = new Node("Views", null, null, true);
        for (let m = 0; m < data[i].tables[j].views.length; m++) {
          let childViews = new Node(data[i].tables[j].views[m].displayName, <ViewIcon />, data[i].tables[j].views[m].systemName, data[i].tables[j].views[m].public);
          newView["children"].push(childViews);
        }
        newTable["children"].push(newView);
        newData["children"].push(newTable);
      }
      transformedData.push(newData);
    }
    return transformedData;
  }

  let transformDataFunctionWithDisplayName = (data) => {
    for (let i = 0; i < data.length; i++) {
      let newData = new Node(data[i].displayName + " (" + data[i].systemName + ")", null, data[i].systemName, data[i].public);
      for (let j = 0; j < data[i].tables.length; j++) {
        let newTable = new Node(data[i].tables[j].displayName + " (" + data[i].tables[j].systemName + ")", <TableIcon />, data[i].tables[j].systemName, data[i].tables[j].public);

        let newForm = new Node("Forms", null, null, true);
        for (let k = 0; k < data[i].tables[j].forms.length; k++) {
          let childForms = new Node(data[i].tables[j].forms[k].displayName + " (" + data[i].tables[j].forms[k].systemName + ")", <FormIcon />, data[i].tables[j].forms[k].systemName, data[i].tables[j].forms[k].public);
          newForm["children"].push(childForms);
        }
        newTable["children"].push(newForm);
        let newColumn = new Node("Columns", null, null, true);
        for (let l = 0; l < data[i].tables[j].columns.length; l++) {
          let childColumns = new Node(data[i].tables[j].columns[l].displayName + " (" + data[i].tables[j].columns[l].systemName + ")", <ColumnIcon />, data[i].tables[j].columns[l].systemName, null);
          newColumn["children"].push(childColumns);
        }
        newTable["children"].push(newColumn);
        let newView = new Node("Views", null, null, true);
        for (let m = 0; m < data[i].tables[j].views.length; m++) {
          let childViews = new Node(data[i].tables[j].views[m].displayName + " (" + data[i].tables[j].views[m].systemName + ")", <ViewIcon />, data[i].tables[j].views[m].systemName, data[i].tables[j].views[m].public);
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
    // if (props.treeUpdate) {
    //   props.treeUpdate(props.data);
    // }
    return <Tree showIcon={props.showIcon} treeData={props.data} autoExpandParent={true} />;
  } else {
    let treeData = (props.displaySystemName === true) ? transformDataFunctionWithDisplayName(props.data) : transformDataFunction(props.data)
    if (props.treeUpdate) {
      props.treeUpdate(treeData);
    }
    return <Tree showIcon={props.showIcon} treeData={treeData} autoExpandParent={true} />;
  }
};



