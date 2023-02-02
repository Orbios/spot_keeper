require('dotenv').config({ path: `${__dirname}/../.env.local` });

const {createClient} = require('@supabase/supabase-js');
const fs = require('fs-extra');
const {Client} = require('pg');

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

async function seedData() {
  const seedData = await fs.readJson('./scripts/seedData.json');

  try {
    await clearDatabase();

    const userLookup = await seedUsers(seedData.users);
    const listLookup = await seedLists(seedData.lists, userLookup);
    await seedSpots(seedData.spots, userLookup, listLookup);

    console.log('DB was seeded!');
  } catch (err) {
    console.error(`Data Seed error`);
    console.log(err);
  }
}

async function seedUsers(usersData) {
  const userLookup = {};

  for (const userData of usersData) {
    const local = userData.profile.local;

    const {
      data: {user},
      error
    } = await supabase.auth.admin.createUser({
      email: userData.email,
      email_confirm: local.isActivated,
      password: local.password,
      user_metadata: {
        first_name: local.firstName,
        last_name: local.lastName
      }
    });

    if (error) throw new Error(error.message);

    userLookup[userData.id] = user.id;
  }

  return userLookup;
}

async function seedLists(listsData, userLookup) {
  const listLookup = {};

  for (const list of listsData) {
    const {data, error} = await supabase
      .from('list')
      .insert({
        title: list.title,
        description: list.description,
        imageUrl: list.imageUrl,
        ownerId: userLookup[list.ownerId]
      })
      .select('id');

    if (error) throw new Error(error.message);

    listLookup[list.id] = data[0].id;
  }

  return listLookup;
}

async function seedSpots(spotsData, userLookup, listLookup) {
  for (const spot of spotsData) {
    const {data, error} = await supabase.from('spot').insert({
      title: spot.title,
      description: spot.description,
      imageUrl: spot.imageUrl,
      mapLink: spot.mapLink,
      listId: listLookup[spot.listId],
      ownerId: userLookup[spot.ownerId]
    });

    if (error) throw new Error(error.message);
  }
}

async function clearDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  await client.connect();

  console.log('Connected to DB.');

  await client.query('DELETE FROM spot');
  await client.query('DELETE FROM list');

  const {
    data: {users},
    error
  } = await supabase.auth.admin.listUsers();

  if (error) throw new Error(error.message);

  for (const user of users) {
    const {data, error} = await supabase.auth.admin.deleteUser(user.id);

    if (error) throw new Error(error.message);
  }

  await client.end();

  console.log('DB was successfully cleared!');
}

seedData();
