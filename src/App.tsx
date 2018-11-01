import { Table } from "antd";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "昵称"
  },
  {
    dataIndex: "age",
    key: "age",
    title: "Age"
  },
  {
    dataIndex: "address",
    key: "address",
    title: "Address"
  },
  {
    dataIndex: "action",
    key: "action",
    title: "Action"
  }
];
const datas = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Table columns={columns} dataSource={datas} />
        </div>
      </div>
    );
  }
}

export default App;
