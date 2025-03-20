const validateUserData = require('./validateUserData');

// Testoni të dhëna të vlefshme
test('validon të dhëna të vlefshme', () => {
    const userData = {
        username: 'user123',
        email: 'user@example.com',
        password: 'Password1!',
        age: 25,
        referralCode: 'REFCODE1'
    };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
});

// Testoni formatin e gabuar të të dhënave
test('kthen gabim për të dhëna jo objekt', () => {
    const userData = "invalid data";
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.global).toBe("Invalid user data format");
});

// Testoni emrin e përdoruesit të zbrazët
test('kthen gabim për emër të përdoruesit të zbrazët', () => {
    const userData = { email: 'user@example.com', password: 'Password1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe("Username is required");
});

// Testoni gjatësinë e shkurtër të emrit të përdoruesit
test('kthen gabim për emër të përdoruesit me gjatësi të shkurtër', () => {
    const userData = { username: 'ab', email: 'user@example.com', password: 'Password1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe("Username must be between 3 and 20 characters");
});

// Testoni karaktere të palejuara në emrin e përdoruesit
test('kthen gabim për emër të përdoruesit me karaktere të palejuara', () => {
    const userData = { username: 'user@name', email: 'user@example.com', password: 'Password1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe("Username can only contain letters, numbers, and underscores");
});

// Testoni email-in e zbrazët
test('kthen gabim për email të zbrazët', () => {
    const userData = { username: 'user123', password: 'Password1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Email is required");
});

// Testoni formatin e gabuar të email-it
test('kthen gabim për format të gabuar të email-it', () => {
    const userData = { username: 'user123', email: 'invalid-email', password: 'Password1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Invalid email format");
});

// Testoni password-in e zbrazët
test('kthen gabim për password të zbrazët', () => {
    const userData = { username: 'user123', email: 'user@example.com' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe("Password is required");
});

// Testoni gjatësinë e shkurtër të password-it
test('kthen gabim për password me gjatësi të shkurtër', () => {
    const userData = { username: 'user123', email: 'user@example.com', password: 'Pass1!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe("Password must be at least 8 characters long");
});

// Testoni password pa numra
test('kthen gabim për password pa numra', () => {
    const userData = { username: 'user123', email: 'user@example.com', password: 'Password!' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe("Password must contain at least one number");
});

// Testoni password pa karaktere speciale
test('kthen gabim për password pa karaktere speciale', () => {
    const userData = { username: 'user123', email: 'user@example.com', password: 'Password1' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.password).toBe("Password must contain at least one special character");
});

// Testoni moshën e paligjshme
test('kthen gabim për moshë të paligjshme', () => {
    const userData = { username: 'user123', email: 'user@example.com', password: 'Password1!', age: 17 };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.age).toBe("User must be at least 18 years old");
});

// Testoni kodin e referimit me gjatësi të gabuar
test('kthen gabim për kod referimi me gjatësi të gabuar', () => {
    const userData = { username: 'user123', email: 'user@example.com', password: 'Password1!', referralCode: 'REF1' };
    const result = validateUserData(userData);
    expect(result.isValid).toBe(false);
    expect(result.errors.referralCode).toBe("Referral code must be exactly 8 characters");
});