import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";

export default function AddClientModal() {
  const [deviceName, setDeviceName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [agentId, setAgentId] = useState("");
  const [notes, setNotes] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      deviceName,
      ipAddress,
      serialNumber,
      macAddress,
      agentId,
      notes,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECT });

      cache.writeQuery({
        query: GET_PROJECT,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (deviceName === "" || ipAddress === "" || serialNumber === "") {
      return alert("Please fill in all fields");
    }

    addProject(deviceName, ipAddress, serialNumber, macAddress, agentId, notes);

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
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add New IP Address</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add New IP Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Device Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ip Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Serial Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                  <div className="mb-3">
                    <label className="form-label">Mac Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={macAddress}
                      onChange={(e) => setMacAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Agent Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
