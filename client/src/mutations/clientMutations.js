import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
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

const UPDATE_CLIENT = gql`
  mutation UpdateClient(
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

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      deviceName
      ipAddress
      serialNumber
      macAddress
      agentId
    }
  }
`;

export { ADD_CLIENT, UPDATE_CLIENT, DELETE_CLIENT };
