import React from "react";
import { ServerItem } from "./ServerItem";

export const ServersList = (props) => {
  const { servers, removeItem } = props;

  return (
    <div className="p-4 pb-0 table-responsive table-responsive-sm">
      <table className="table table-hover table-lg  pb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th className="ha-center" scope="col">
              Image
            </th>
            <th scope="col">IP Address</th>
            <th scope="col">Name</th>
            <th scope="col">Memory</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th className="ha-center" scope="col">
              Ping
            </th>
            <th className="ha-center" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <ServerItem server={server} key={server.id} removeItem={removeItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
