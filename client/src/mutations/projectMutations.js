import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addClient(
    $deviceName: String!
    $ipAddress: String!
    $serialNumber: String!
    $macAddress: String!
    $agentId: String!
    $notes: String!
  ) {
    addClient(
      deviceName: $deviceName
      ipAddress: $ipAddress
      serialNumber: $serialNumber
      macAddress: $macAddress
      agentId: $agentId
      notes: $notes
    ) {
      id
      deviceName
      ipAddress
      serialNumber
      macAddress
      agentId
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $deviceName: String!
    $ipAddress: String!
    $serialNumber: String!
    $macAddress: String!
    $agentId: String!
    $notes: String!
  ) {
    addClient(
      deviceName: $deviceName
      ipAddress: $ipAddress
      serialNumber: $serialNumber
      macAddress: $macAddress
      agentId: $agentId
      notes: $notes
    ) {
      id
      deviceName
      ipAddress
      serialNumber
      macAddress
      agentId
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
