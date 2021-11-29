import { Tree } from "antd";
import { Schema } from "./data";
import {
  FormOutlined,
  TableOutlined,
  FilterOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import React from "react";

type MyTreeProps = {
  data: Schema[];
};

const FormIcon = FormOutlined;
const TableIcon = TableOutlined;
const ViewIcon = FilterOutlined;
const ColumnIcon = NumberOutlined;

// If you don't want to use typescript, use line 10 instead of 11 and comment out the type on line 5
// export const MyTree = (props) => {
export const MyTree = (props: MyTreeProps) => {
  const sampleData = [
    {
      title: "Sample Data",
      key: "sample",
      icon: <FormIcon />,
      children: [
        { title: "Sample Child 1", key: "sample child 1", icon: <ViewIcon /> },
        {
          title: "Sample Child 2",
          key: "sample child 2",
        },
      ],
    },
  ];

  // TODO - replace sampleData with testData transformed from props
  const treeData = sampleData;

  return <Tree showIcon treeData={treeData} autoExpandParent={true} />;
};
