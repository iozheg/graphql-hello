const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = graphql;

const {
  getUserById,
  getProjectById,
} = require('./dbRequests');

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
     id: { type: GraphQLID },
     first_name: { type: GraphQLString },
     last_name: { type: GraphQLString },
     email: { type: GraphQLString },
  }
})

const ProjectType = new GraphQLObjectType({
 name: 'Project',
 fields: {
   id: { type: GraphQLString },
   name: { type: GraphQLString },
   creator: {
     type: PersonType,
     resolve(parentValue) {
       return getUserById(parentValue.creator);
     }
   }
 }
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
     id: { type: GraphQLID },
     name: { type: GraphQLString },
     creator: {
       type: PersonType,
       resolve(parentValue) {
         return getUserById(parentValue.creator);
       }
     },
     executor: {
       type: PersonType,
       resolve(parentValue) {
         return getUserById(parentValue.executor);
       }
     },
     project: {
       type: ProjectType,
       resolve(parentValue) {
         return getProjectById(parentValue.project);
       }
     },
     start_date: { type: GraphQLString },
     end_date: { type: GraphQLString },
  }
});


const PersonInputType = new GraphQLInputObjectType({
  name: 'PersonInput',
  fields: {
     first_name: { type: GraphQLString },
     last_name: { type: GraphQLString },
     email: { type: GraphQLString },
  }
})
const ProjectInputType = new GraphQLInputObjectType({
  name: 'ProjectInput',
  fields: {
    name: { type: GraphQLString },
    creator: { type: GraphQLInt },
  }
});

const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
     name: { type: GraphQLString },
     creator: { type: GraphQLInt },
     executor: { type: GraphQLInt },
     project: { type: GraphQLInt },
     start_date: { type: GraphQLString },
     end_date: { type: GraphQLString },
  }
});

module.exports = {
  PersonType,
  ProjectType,
  TaskType,
  PersonInputType,
  ProjectInputType,
  TaskInputType
}