import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
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

export { GET_CLIENTS };
