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

const PersonType = new GraphQLObjectType({
   name: 'Person',
   fields: {
      id: { type: GraphQLID },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
   }
})

const TaskType = new GraphQLObjectType({
   name: 'Task',
   fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      creator: {
        type: PersonType,
        resolve(parentValue, args) {
           const query = `SELECT * FROM public."user" WHERE
           id=${parentValue.creator}`;
           return db.conn.one(query)
              .then(data => {
                 return data;
              })
              .catch(err => {
                 return 'The error is', err;
              });
        }
      },
      executor: {
        type: PersonType,
        resolve(parentValue, args) {
           const query = `SELECT * FROM public."user" WHERE
           id=${parentValue.executor}`;
           return db.conn.one(query)
              .then(data => {
                 return data;
              })
              .catch(err => {
                 return 'The error is', err;
              });
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
        const query = `SELECT * FROM public."user" ${args.id}`;
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
    }
  }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: RootMutation
})