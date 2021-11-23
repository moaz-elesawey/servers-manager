import React from "react";

export const ServerItem = (props) => {
  const {server, removeItem} = props;
  const { id, name, ip_address, status, memory, server_type } = server;

  let status_style = "badge bg-success rounded";
  let server_style = "status-up";
  if (status === "STATUS DOWN") {
    status_style = "badge bg-danger rounded";
    server_style = "status-down";
  }


  const deleteItem = (e) => {
    removeItem(id);
  }

  return (
    <tr>
      <th>{id}</th>
      <td className={`ha-center ${server_style}`}>
        <i className="fas fa-2x fa-server"></i>
      </td>
      <td>{ip_address}</td>
      <td>{name}</td>
      <td>{memory}</td>
      <td>{server_type}</td>
      <td>
        <span className={status_style}>{status}</span>
      </td>
      <td className="ha-center" id="ping">
        <button className="btn btn-sm btn-primary rounded">
          <i className="fas fa-network-wired"></i>
        </button>
      </td>
      <td className="ha-center" id="trash-bin" onClick={deleteItem}>
        <button className="btn btn-sm btn-danger rounded">
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
