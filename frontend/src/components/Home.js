import React from "react";
import { ServersList } from "./ServersList";
import { Header } from "./Header";
import { NewServerForm } from "./NewServerForm";

const Home = (props) => {
  const {addNewServer, removeItem, filterServer, servers} = props;

  return (
    <div>
      <div className="card shadow-sm rounded">
        <Header filterServer={filterServer} />
        <ServersList servers={servers} removeItem={removeItem} />
        <NewServerForm addNewServer={addNewServer} />
      </div>
    </div>
  );
};

export default Home;
