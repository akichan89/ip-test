import { useState } from "react";
import { CSVLink } from "react-csv";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function DownloadCSV() {
  const [deviceName, setDeviceName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [agentId, setAgentId] = useState("");
  const [notes, setNotes] = useState("");

  const { fileData, setFileData } = useState();
  const fileHeaders = "device name";

  // json key should match the header's ke

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      deviceName,
      ipAddress,
      serialNumber,
      macAddress,
      agentId,
      notes,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
      setFileData({ clients });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (deviceName === "" || ipAddress === "" || serialNumber === "") {
      return alert("Please fill in all fields");
    }

    addClient(deviceName, ipAddress, serialNumber, macAddress, agentId, notes);

    setDeviceName("");
    setIpAddress("");
    setSerialNumber("");
    setMacAddress("");
    setAgentId("");
    setNotes("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#downloadCSVModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Download CSV</div>
        </div>
      </button>
      <div
        className="modal fade"
        id="downloadCSVModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Export to CSV
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {fileData?.length && (
              <CSVLink
                headers={fileHeaders}
                data={fileData}
                filename="results.csv"
                target="_blank"
              >
                Export
              </CSVLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
