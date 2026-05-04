const { test, expect } = require('@playwright/test');

test('API Flow', async ({ request }) => {

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'free_user_3DGK2h2uqO0a8qPLxsNzGqw9E0u'
  };

  // CREATE USER
  const createRes = await request.post('https://reqres.in/api/users', {
    headers,
    data: { name: 'Poonam', job: 'QA' }
  });

  expect(createRes.status()).toBe(201);

  const createData = await createRes.json();
  const userId = createData.id;

  // UPDATE USER (skip GET)
  const updateRes = await request.put(`https://reqres.in/api/users/${userId}`, {
    headers,
    data: { name: 'Poonam Updated' }
  });

  expect(updateRes.status()).toBe(200);

  const updateData = await updateRes.json();
  expect(updateData.name).toBe('Poonam Updated');
});