const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fp",
  password: "Qb1p5d.3t",
  port: 5432,
});
const getusers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const getlinks = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM links ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const getuserrole = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT class_name, users.name, users.user_role  FROM class INNER JOIN users ON class.id=users.class_id;",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const getuserrecordings = () => {
  return new Promise(function (resolve, reject) {
    const idR = request.params.id;
    pool.query(
      "select * from recordings r inner join class c2 on c2.id = r.class_id inner join users u on u.class_id = c2.id where u.name = $1;",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve.json(results.rows);
      }
    );
  });
};

const createuser = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, password } = body;
    pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
      [name, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new user has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteuser = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`user deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getusers,
  createuser,
  deleteuser,
  getlinks,
  getuserrole,
  getuserrecordings,
};
