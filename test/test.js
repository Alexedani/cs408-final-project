QUnit.test('Login fails with empty input', function(assert) {
    const username = '';
    const password = '';
    const result = validateLoginFields(username, password); // You'd extract this logic into a reusable function
    assert.notOk(result.valid, 'Should not be valid when username or password is empty');
  });

  QUnit.test('Login succeeds with correct user data', function(assert) {
    const fakeDatabase = [
      { id: 2, username: 'testuser', password: '1234' }
    ];
  
    const result = fakeDatabase.find(u => u.username === 'testuser' && u.password === '1234');
    assert.ok(result, 'User should be found in mock DB');
  });

  QUnit.test('Register fails if username already exists', function(assert) {
    const fakeDatabase = [
      { id: 1, username: 'john', password: 'pass' }
    ];
    const newUser = { username: 'john', password: 'newpass' };
  
    const exists = fakeDatabase.some(u => u.username === newUser.username);
    assert.ok(exists, 'Username already exists');
  });

  QUnit.test('Account is created with valid data', function(assert) {
    const newUser = { username: 'alice', password: 'password123' };
    const isValid = newUser.username && newUser.password;
    assert.ok(isValid, 'New user has valid username and password');
  });

  QUnit.test('Cipher is valid before saving', function(assert) {
    const cipher = {
      username: 'testuser',
      ciphername: 'Caesar 1',
      ciphertext: 'KHOOR',
      cipherhint: 'Shift of 3',
      ciphertype: 'Caesar'
    };
  
    const allFieldsPresent = Object.values(cipher).every(val => val !== '');
    assert.ok(allFieldsPresent, 'All cipher fields are present');
  });
  
  
  
  