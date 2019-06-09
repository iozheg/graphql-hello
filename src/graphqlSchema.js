const graphql = require('graphql');
const connectionString = "postgres://postgres:123456@localhost:5432/graphql-test";
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);

const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLBoolean,
   GraphQLList,
   GraphQLSchema
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
      executer: {
        type: PersonType,
        resolve(parentValue, args) {
           const query = `SELECT * FROM public."user" WHERE
           id=${parentValue.executer} OR id=${parentValue.creator}`;
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
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."task"`;
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
})

module.exports = new GraphQLSchema({
   query: RootQuery
})