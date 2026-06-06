// src/modules/auth/auth.repository.js
const db = require('../../config/database');

const findUserByEmail = async (email) => {
  const query = `
    SELECT u.id, u.email, u.password_hash, u.is_active, r.name as role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.email = $1
  `;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

const createUser = async (client, email, passwordHash, roleId) => {
  const query = `
    INSERT INTO users (email, password_hash, role_id, is_active)
    VALUES ($1, $2, $3, true)
    RETURNING id, email;
  `;
  const { rows } = await client.query(query, [email, passwordHash, roleId]);
  return rows[0];
};

const findRoleByName = async (roleName) => {
  const query = `SELECT id, name FROM roles WHERE name = $1`;
  const { rows } = await db.query(query, [roleName]);
  return rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  findRoleByName,
};