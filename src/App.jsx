import React, { useState } from "react";
import "./App.css";
import { Layout, Input, Card, Collapse, Checkbox, Button } from "antd";
import { MyTree } from "./MyTree";
import { testData } from "./data";

const { Header, Content } = Layout;
const { Panel } = Collapse;

function App() {
  const [firstSearch, setFirstSearch] = useState("");
  const [secondSearch, setSecondSearch] = useState("");
  const [thirdSearch, setThirdSearch] = useState("");
  const [fourthSearch, setFourthSearch] = useState("");
  const [publicResultsOnly, setPublicResultsOnly] = useState(false);

  const [data, setData] = useState([]);
  const [isTransformed, setIsTransformed] = useState(false);

  let originalData = testData;
  let originalDataWithDisplayName = testData;

  let dataFormatUpdate = (val) => {
    originalData = val;
  }

  let dataFormatUpdateWithDisplayName = (val) => {
    originalDataWithDisplayName = val;
  }

  let searchBasic = (word, panel) => {
    setIsTransformed(true);
    let currPublic = publicResultsOnly;
    let searchWord = word;
    let dataStorage;

    if (data.length === 0 && isTransformed === false) {
      //using different data for the 4th panel
      dataStorage = (panel === "fourth") ? originalDataWithDisplayName : originalData;
      setData(dataStorage);
    } else {
      dataStorage = data;
    }

    let traverse = (node) => {
      if (node.title !== undefined && node.title.toLowerCase().includes(searchWord)) {
        //only for the second panel to check for the checkbox
        if (panel === "second") {
          if ((node.public === true && currPublic === true) || currPublic === false) {
            return node;
          }
          else if ((node.public === false || node.public === null) && currPublic === true) {
            return [];
          }
        } else {
          return node;
        }
      }
      if (node.title !== undefined && node.children.length === 0 && node.title.toLowerCase().includes(searchWord) === false) return [];

      if (node.children !== undefined && node.children.length > 0) {
        for (let j = 0; j < node.children.length; j++) {
          node.children[j] = traverse(node.children[j]);
        }
        if (node.children.every(element => element.length === 0)) {
          node.children = [];
        }
        if (node.children.length === 0 && node.title.toLowerCase().includes(searchWord) === false) {
          node = [];
        }

        //  remove empty arrays in data
        if (node.title !== undefined) {
          let newArr = [];
          for (let i = 0; i < node.children.length; i++) {
            if (!Array.isArray(node.children[i])) {
              newArr.push(node.children[i]);
            }
          }
          node.children = newArr;
        }
      }
      return node
    }

    let arr = [];
    for (let i = 0; i < dataStorage.length; i++) {
      let results = traverse(dataStorage[i]);
      if (Object.keys(results).length !== 0) {
        arr.push(results);
      }
    }
    return arr;
  }
  let buttonClick = () => {
    setFirstSearch("");
    setSecondSearch("");
    setThirdSearch("");
    setFourthSearch("");
    setPublicResultsOnly(false);
    setIsTransformed(false);
    setData([]);
    originalData = testData;
    originalDataWithDisplayName = testData;
  }

  const onFirstInputChange = (ev) => {
    setFirstSearch(ev.target.value);
    let arr = searchBasic(ev.target.value, "first")
    setData(arr);
    console.log("final results: ", arr)
  };

  const onSecondInputChange = (ev) => {
    setSecondSearch(ev.target.value);
    let arr = searchBasic(ev.target.value, "second")
    setData(arr);
  };

  const onThirdInputChange = (ev) => {
    setThirdSearch(ev.target.value);
    let arr = searchBasic(ev.target.value, "third")
    setData(arr);
  };

  const onFourthInputChange = (ev) => {
    setFourthSearch(ev.target.value);
    let arr = searchBasic(ev.target.value, "fourth")
    setData(arr);
  };

  const onPublicCheckboxChange = (ev) => {
    setPublicResultsOnly(ev.target.checked);
  };

  return (
    <Layout>
      <Header>
        <h1 style={{ color: "white" }}>Searchable Tree Take Home </h1>
      </Header>
      <Content>
        <Card>
          <Button type="button" danger onClick={() => buttonClick()}>Reset</Button>
          <Collapse>
            <Panel header="1. Basic" key="basic">
              <Input onChange={onFirstInputChange} value={firstSearch} />
              <br />
              <MyTree
                data={data.length === 0 && isTransformed === false ? originalData : data}
                transform={isTransformed}
                treeUpdate={item => dataFormatUpdate(item)}
                showIcon={false}
              />
            </Panel>
            <Panel header="2. With Public Filter" key="with-public">
              <Checkbox
                onChange={onPublicCheckboxChange}
                checked={publicResultsOnly}
              >
                Only Include Public Objects?
              </Checkbox>
              <Input onChange={onSecondInputChange} value={secondSearch} />
              <br />
              <MyTree
                data={data.length === 0 && isTransformed === false ? originalData : data}
                transform={isTransformed}
                treeUpdate={item => dataFormatUpdate(item)}
                showIcon={false} />
            </Panel>
            <Panel header="3. With Type Icons" key="with-icons-3">
              <Input onChange={onThirdInputChange} value={thirdSearch} />
              <br />
              <MyTree
                data={data.length === 0 && isTransformed === false ? originalData : data}
                transform={isTransformed}
                treeUpdate={item => dataFormatUpdate(item)}
                showIcon={true} />
            </Panel>
            <Panel header="4. With System Name in Parenthesis" key="with-icons-4">
              <Input onChange={onFourthInputChange} value={fourthSearch} />
              <br />
              <MyTree
                data={data.length === 0 && isTransformed === false ? originalData : data}
                transform={isTransformed}
                treeUpdate={item => dataFormatUpdateWithDisplayName(item)}
                showIcon={false}
                displaySystemName={true}
              />
            </Panel>
          </Collapse>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;
