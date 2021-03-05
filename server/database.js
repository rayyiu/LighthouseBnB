const properties = require('./json/properties.json');
const users = require('./json/users.json');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lightbnb',
  password: 'postgres',
  port: 5432,
})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query('SELECT *  FROM users WHERE email = $1', [email])
    .then(res => res.rows)
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query('SELECT *  FROM users WHERE id = $1', [id])
    .then(res => res.rows)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
    [user.name, user.email, user.password])
    .then(res => res.rows.id)
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`SELECT properties.*, reservations.start_date, reservations.end_date FROM 
  reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2;`, [guest_id, limit])
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night * 100));
    queryString += `AND properties.cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night * 100));
    queryString += `AND properties.cost_per_night < $${queryParams.length}`;
  }

  // 4
  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) > $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryParams = [];
  let queryString = `
  INSERT INTO properties (
    owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
    VALUES (
  `;

  property.owner_id ? queryParams.push(`${property.owner_id}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.title ? queryParams.push(`${property.title}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.description ? queryParams.push(`${property.description}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.thumbnail_photo_url ? queryParams.push(`${property.thumbnail_photo_url}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.cover_photo_url ? queryParams.push(`${property.cover_photo_url}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.cost_per_night ? queryParams.push(`${property.cost_per_night * 100}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.street ? queryParams.push(`${property.street}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.city ? queryParams.push(`${property.city}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.province ? queryParams.push(`${property.province}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.post_code ? queryParams.push(`${property.post_code}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.country ? queryParams.push(`${property.country}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.parking_spaces ? queryParams.push(`${property.parking_spaces}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.number_of_bathrooms ? queryParams.push(`${property.number_of_bathrooms}`) : queryParams.push('')
  queryString += `$${queryParams.length}, `;

  property.number_of_bedrooms ? queryParams.push(`${property.number_of_bedrooms}`) : queryParams.push('')
  queryString += `$${queryParams.length}`;

  queryString += `)
  RETURNING *;
  `;

  // console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows;
    });
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
