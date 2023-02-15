import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      deviceName
      ipAddress
      serialNumber
      macAddress
      agentId
      notes
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      deviceName
      ipAddress
      serialNumber
      macAddress
      agentId
      notes
      client {
        id
        deviceName
        ipAddress
        serialNumber
        macAddress
        agentId
        notes
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
