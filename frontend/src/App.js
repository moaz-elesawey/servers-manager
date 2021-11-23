import "./App.css";
import { Nav } from "./components/layout/Nav";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import {URL} from './utils'

function App() {
  const [servers, setServers] = useState([]);

  const addNewServer = (newServer) => {
    fetch(`${URL}/servers/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newServer),
    }).then((res) => res.json().then((data) => setServers([data, ...servers])));
  };

  const onDelete = (id) => {
    fetch(`${URL}/servers/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setServers([...servers.filter((server) => server.id !== id)]);

      }
    });

  };

  const filterServer = (servers) => {
    setServers(servers);
  }

  useEffect(() => {
    fetch(`${URL}/servers/`).then((res) =>
      res.json().then((data) => setServers(data))
    );
  }, []);
  

  return (
    <div className="App">
      <Nav />
      <div className="container mt-4">
        <Home
          servers={servers}
          addNewServer={addNewServer}
          removeItem={onDelete}
          filterServer={filterServer}
        />
      </div>
    </div>
  );
}

export default App;
