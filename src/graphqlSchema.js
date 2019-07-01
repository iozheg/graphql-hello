const graphql = require('graphql');
const connectionString = "postgres://postgres:123456@localhost:5432/graphql-test";
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);

const {
   GraphQLObjectType,
   GraphQLInputObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLInt,
   GraphQLBoolean,
   GraphQLList,
   GraphQLSchema,
   GraphQLNonNull
} = graphql;

async function getUserById(id) {
  const query = `SELECT * FROM public."user" WHERE id=${id}`;
  console.log('Query', query)
  return db.conn.one(query)
     .then(data => {
        return data;
     })
     .catch(err => {
        console.log('The error is', err)
        return 'The error is', err;
     });
}

async function getProjectById(id) {
  const query = `SELECT * FROM public."project" WHERE id=${id}`;
  console.log('Query', query)
  return db.conn.one(query)
     .then(data => {
        return data;
     })
     .catch(err => {
        console.log('The error is', err)
        return 'The error is', err;
     });
}

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
        resolve(parentValue, args) {
          return getUserById(parentValue.creator);
        }
      },
      executor: {
        type: PersonType,
        resolve(parentValue, args) {
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
})

const RootQuery = new GraphQLObjectType({
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
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."user"`;
        console.log('Query', query)
        return db.conn.many(query)
          .then(data => {
              return data;
          })
          .catch(err => {
              console.log('The error is', err)
              return 'The error is', err;
          });
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
        const condition = args.userId
          ? `WHERE creator=${args.userId}`
          : "";
        const query = `SELECT * FROM public."project" ${condition}`;
        return db.conn.many(query)
          .then(data => {
              return data;
          })
          .catch(err => {
              return 'The error is', err;
          });}
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."task" WHERE id=${args.id}`;
        return db.conn.one(query)
          .then(data => {
              return data;
          })
          .catch(err => {
              return 'The error is', err;
          });
      }
    },
    userTasks: {
      type: new GraphQLList(TaskType),
      args: { userId: { type: GraphQLID } },
      resolve(parentValue, args) {
        const condition = args.userId
          ? `WHERE creator=${args.userId} OR executor=${args.userId}`
          : "";
        const query = `SELECT * FROM public."task" ${condition}`;
        return db.conn.many(query)
          .then(data => {
              return data;
          })
          .catch(err => {
              return 'The error is', err;
          });
      }
    }
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
const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
     name: { type: GraphQLString },
     creator: { type: GraphQLInt },
     executor: { type: GraphQLInt },
     start_date: { type: GraphQLString },
     end_date: { type: GraphQLString },
  }
})

const RootMutation = new GraphQLObjectType({
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
        const keys = Object.keys(args.input);
        const values = Object.values(args.input);
        const query = `INSERT INTO public."user"
          (${keys.join(",")}) VALUES ('${values.join("','")}')`;
        return db.conn.none(query)
          .then(data => {
              return args.input;
          })
          .catch(err => {
              return 'The error is', err;
          });
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
        const keys = Object.keys(args.input);
        const values = Object.values(args.input);
        const query = `INSERT INTO public."task"
          (${keys.join(",")}) VALUES ('${values.join("','")}')`;
        console.log(query);
        return db.conn.none(query)
          .then(data => {
              return args.input;
          })
          .catch(err => {
              return 'The error is', err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: RootMutation
})