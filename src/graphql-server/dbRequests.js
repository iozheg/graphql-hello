/* eslint-disable no-console */
const connectionString = "postgres://postgres:123456@localhost:5432/graphql-test";
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);

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

async function getTaskById(id) {
  const query = `SELECT * FROM public."task" WHERE id=${id}`;
  return db.conn.one(query)
    .then(data => {
        return data;
    })
    .catch(err => {
        return 'The error is', err;
    });
}

async function getUsers() {
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

async function getProjects(creatorId) {
  const condition = creatorId
    ? `WHERE creator=${creatorId}`
    : "";
  const query = `SELECT * FROM public."project" ${condition}`;
  return db.conn.many(query)
    .then(data => {
        return data;
    })
    .catch(err => {
        return 'The error is', err;
    });
}

async function getTasks(userId) {
  const condition = userId
    ? `WHERE creator=${userId} OR executor=${userId}`
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

async function addUser(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `INSERT INTO public."user"
    (${keys.join(",")}) VALUES ('${values.join("','")}')`;
  return db.conn.none(query)
    .then(data => {
        return data;
    })
    .catch(err => {
        return 'The error is', err;
    });
}

async function addProject(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `INSERT INTO public."project"
    (${keys.join(",")}) VALUES ('${values.join("','")}')`;
  console.log(query);
  return db.conn.none(query)
    .then(data => {
        return data;
    })
    .catch(err => {
        return 'The error is', err;
    });
}

async function addTask(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `INSERT INTO public."task"
    (${keys.join(",")}) VALUES ('${values.join("','")}')`;
  console.log(query);
  return db.conn.none(query)
    .then(data => {
        return data;
    })
    .catch(err => {
        return 'The error is', err;
    });
}

module.exports = {
  getUserById,
  getProjectById,
  getTaskById,
  getUsers,
  getProjects,
  getTasks,
  addUser,
  addProject,
  addTask
}