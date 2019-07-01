const graphql = require('graphql');
const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLList
} = graphql;

const {
  getUserById,
  getProjectById,
  getTaskById,
  getUsers,
  getProjects,
  getTasks
} = require('../dbRequests');

const {
  PersonType,
  ProjectType,
  TaskType
} = require('../types');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return getUserById(args.id);
      }
    },
    persons: {
      type: new GraphQLList(PersonType),
      resolve() {
        return getUsers();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID }},
      resolve(parentValue, args) {
        return getProjectById(args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: { userId: { type: GraphQLID }},
      resolve(parentValue, args) {
        return getProjects(args.userId);
      }
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return getTaskById(args.id);
      }
    },
    userTasks: {
      type: new GraphQLList(TaskType),
      args: { userId: { type: GraphQLID } },
      resolve(parentValue, args) {
        return getTasks(args.userId);
      }
    }
  }
});
