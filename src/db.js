import { createApolloFetch } from 'apollo-fetch';

const fetchGQL = createApolloFetch({
  uri: 'http://0.0.0.0:8080/graphql'
});

export default {
  fetchAllPersons: async function () {
    const query = `
      {
        persons{
          id
          first_name
          last_name
          email
        }
      }
    `;
    const result = await fetchGQL({query});
    return result.data;
  },
  getUserTasks: async function (id) {
    const taskByUser = `query userTasks($id: ID) {
      userTasks(userId: $id) {
        id
        name
        creator {
          last_name
        }
        executor {
          last_name
        }
        start_date
        end_date
      }
    }`;
    const result = await fetchGQL({
      query: taskByUser,
      variables: { id: id }
    });
    return result.data.userTasks;
  },
  createUser: async function ({ first_name, last_name, email }) {
    const createQuery = `mutation user($input: PersonInput!) {
      user(input: $input) {
        id
        first_name
        last_name
        email
      }
    }`;

    const result = await fetchGQL({
      query: createQuery,
      variables: { input: { first_name, last_name, email: email } }
    });
    return result.data.user;
  }
};
