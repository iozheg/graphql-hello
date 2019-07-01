import { createApolloFetch } from 'apollo-fetch';

const fetchGQL = createApolloFetch({
  uri: `http://0.0.0.0:${window.location.port}/graphql`
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

  getUserProjects: async function (id) {
    const projectByUser = `query projects($id: ID) {
      projects(userId: $id) {
        id
        name
        creator {
          last_name
        }
      }
    }`;

    const result = await fetchGQL({
      query: projectByUser,
      variables: { id: id }
    });
    return result.data.projects;
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
        project {
          name
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
      variables: { input: { first_name, last_name, email } }
    });
    return result.data.user;
  },
  createTask: async function ({ name, creator, executor, start_date, end_date }) {
    const createQuery = `mutation task($input: TaskInput!) {
      task(input: $input) {
        name
      }
    }`;

    const result = await fetchGQL({
      query: createQuery,
      variables: { input: { name, creator, executor, project, start_date, end_date } }
    });
    return result.data.task;
  }
};
