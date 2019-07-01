const graphql = require('graphql');

const {
   GraphQLObjectType,
   GraphQLNonNull
} = graphql;

const {
  addUser,
  addProject,
  addTask
} = require('../dbRequests');

const {
  PersonType,
  ProjectType,
  TaskType,
  PersonInputType,
  ProjectInputType,
  TaskInputType
} = require('../types');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    user: {
      type: PersonType,
      args: {
        input: {
          type: new GraphQLNonNull(PersonInputType)
        }
      },
      resolve(parentValue, args) {
        return addUser(args.input);
      }
    },
    project: {
      type: ProjectType,
      args: {
        input: {
          type: new GraphQLNonNull(ProjectInputType),
        }
      },
      resolve(parentValue, args) {
        return addProject(args.input);
      }
    },
    task: {
      type: TaskType,
      args: {
        input: {
          type: new GraphQLNonNull(TaskInputType)
        }
      },
      resolve(parentValue, args) {
        return addTask(args.input);
      }
    }
  }
});