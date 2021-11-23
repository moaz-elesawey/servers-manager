import React from "react";
import { URL } from "../utils";

export const Header = (props) => {
  const { filterServer } = props;

  const saveStreamCSV = (filename, text) => {
    if (window.navigator.msSaveBlob) {
      // IE 10 and later, and Edge.
      var blobObject = new Blob([text], { type: "text/csv" });
      window.navigator.msSaveBlob(blobObject, filename);
    } else {
      // Everthing else (except old IE).
      // Create a dummy anchor (with a download attribute) to click.
      var anchor = document.createElement("a");
      anchor.download = filename;
      if (window.URL.createObjectURL) {
        // Everything else new.
        var blobObject = new Blob([text], { type: "text/csv" });
        anchor.href = window.URL.createObjectURL(blobObject);
      } else {
        // Fallback for older browsers (limited to 2MB on post-2010 Chrome).
        // Load up the data into the URI for "download."
        anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(text);
      }
      // Now, click it.
      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        anchor.dispatchEvent(event);
      } else {
        anchor.click();
      }
    }
  };

  const onFilterChanged = (e) => {
    const status = e.target.value;

    fetch(`${URL}/filter/?status=${status}`).then((res) =>
      res.json().then((data) => filterServer(data))
    );
  };

  const fetchReport = (e) => {
    fetch(`${URL}/report/`)
      .then((res) => res.text())
      .then((text) => {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDay();
        saveStreamCSV(`[${year}-${month}-${day}]-report.csv`, text)
      });
  };

  return (
    <div
      className="d-flex flex-column flex-md-row flex-lg-row justify-content-between align-items-center flex-sm-column p-3 text-light"
      style={{ backgroundColor: "rgb(17 53 84)" }}
    >
      <h5 id="header-title" className="">
        Manage Servers
      </h5>
      <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-center mt-sm-3 mt-3 mt-md-0 mt-lg-0">
        <div className="form-group pr-1 pr-lg-1 pr-md-1 pr-sm-0 w-100">
          <select
            className="form-select form-select-sm w-100"
            id="exampleSelect1"
            onChange={onFilterChanged}
          >
            <option>ALL</option>
            <option>SERVER UP</option>
            <option>SERVER DOWN</option>
          </select>
        </div>

        <button
          className="btn btn-success btn-sm w-100 pr-1 pr-lg-1 pr-md-1 pr-sm-0"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#new-server-modal"
        >
          <i className="fas fa-plus"></i>
          New Server
        </button>
        <button
          className="btn btn-primary btn-sm w-100 pr-1 pr-lg-1 pr-md-1 pr-sm-0"
          onClick={fetchReport}
        >
          Print Report
        </button>
      </div>
    </div>
  );
};
