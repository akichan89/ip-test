import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [deviceName, setDeviceName] = useState(project.deviceName);
  const [ipAddress, setIpAddress] = useState(project.ipAddress);
  const [serialNumber, setSerialNumber] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, deviceName, ipAddress, serialNumber },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!deviceName || !ipAddress || !serialNumber) {
      return alert("Please fill out all fields");
    }

    updateProject(deviceName, ipAddress, serialNumber);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
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
          <label className="form-label">IP Address</label>
          <textarea
            className="form-control"
            id="description"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Serial Number</label>
          <select
            id="status"
            className="form-select"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
