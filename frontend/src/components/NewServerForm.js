import React, { useState } from "react";

export const NewServerForm = (props) => {
  const [ipAddress, setIPAddress] = useState("");
  const [name, setName] = useState("");
  const [serverType, setServerType] = useState("");
  const [memory, setMomery] = useState("");
  const [status, setStatus] = useState(false);

  const {addNewServer} = props;

  const onSubmit = (e) => {
    const newServer = {
      ip_address: ipAddress,
      name: name,
      server_type: serverType,
      memory: memory,
      is_up:status
    };

    addNewServer(newServer);
    
  };

  return (
    <div className="modal fade" id="new-server-modal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Server</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <form action='POST' onSubmit={onSubmit}>
              <div className="form-group pb-3">
                <label htmlFor="ip-address" className="form-label">
                  IP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ip-address"
                  placeholder="192.168.1.1"
                  value={ipAddress}
                  onChange={e => setIPAddress(e.target.value)}
                />
              </div>
              <div className="form-group pb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="e.g. Home Server"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group pb-3">
                    <label htmlFor="memory" className="form-label">
                      Memory
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="memory"
                      placeholder="e.g. 16 GB"
                      value={memory}
                        onChange={e => setMomery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group pb-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      placeholder="e.g. Web Server"
                      value={serverType}
                  onChange={e => setServerType(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-check pt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  value={status}
                  onChange={e => setStatus(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  SERVER UP
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-success" onClick={onSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
