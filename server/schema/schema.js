const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    deviceName: { type: GraphQLString },
    ipAddress: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    macAddress: { type: GraphQLString },
    agentId: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    deviceName: { type: GraphQLString },
    ipAddress: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    macAddress: { type: GraphQLString },
    agentId: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        deviceName: { type: GraphQLNonNull(GraphQLString) },
        ipAddress: { type: GraphQLNonNull(GraphQLString) },
        serialNumber: { type: GraphQLNonNull(GraphQLString) },
        macAddress: { type: GraphQLNonNull(GraphQLString) },
        agentId: { type: GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          deviceName: args.deviceName,
          ipAddress: args.ipAddress,
          serialNumber: args.serialNumber,
          macAddress: args.macAddress,
          agentId: args.agentId,
          notes: args.notes,
        });

        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Active" },
              progress: { value: "Inactive" },
              completed: { value: "Deleted" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          deviceName: args.deviceName,
          ipAddress: args.ipAddress,
          serialNumber: args.serialNumber,
          macAddress: args.macAddress,
          agentId: args.agentId,
          notes: args.notes,
        });

        return project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Active" },
              progress: { value: "Inactive" },
              completed: { value: "Deleted" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              deviceName: args.deviceName,
              ipAddress: args.ipAddress,
              serialNumber: args.serialNumber,
              macAddress: args.macAddress,
              agentId: args.agentId,
              notes: args.notes,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
