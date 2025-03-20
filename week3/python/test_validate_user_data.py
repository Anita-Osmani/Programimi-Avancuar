import pytest
from week3.python.validate_user_data import validate_user_data

# Testoni të dhëna të vlefshme
def test_valid_data():
    user_data = {
        "username": "user123",
        "email": "user@example.com",
        "password": "Password1!",
        "age": 25,
        "referral_code": "REFCODE1"
    }
    result = validate_user_data(user_data)
    assert result["is_valid"] == True
    assert result["errors"] == {}

# Testoni formatin e gabuar të të dhënave
def test_invalid_data_format():
    user_data = "invalid data"
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["global"] == "Invalid user data format"

# Testoni emrin e përdoruesit të zbrazët
def test_missing_username():
    user_data = {"email": "user@example.com", "password": "Password1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["username"] == "Username is required"

# Testoni gjatësinë e shkurtër të emrit të përdoruesit
def test_short_username():
    user_data = {"username": "ab", "email": "user@example.com", "password": "Password1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["username"] == "Username must be between 3 and 20 characters"

# Testoni karaktere të palejuara në emrin e përdoruesit
def test_invalid_username_characters():
    user_data = {"username": "user@name", "email": "user@example.com", "password": "Password1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["username"] == "Username can only contain letters, numbers, and underscores"

# Testoni email-in e zbrazët
def test_missing_email():
    user_data = {"username": "user123", "password": "Password1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["email"] == "Email is required"

# Testoni formatin e gabuar të email-it
def test_invalid_email_format():
    user_data = {"username": "user123", "email": "invalid-email", "password": "Password1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["email"] == "Invalid email format"

# Testoni password-in e zbrazët
def test_missing_password():
    user_data = {"username": "user123", "email": "user@example.com"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["password"] == "Password is required"

# Testoni gjatësinë e shkurtër të password-it
def test_short_password():
    user_data = {"username": "user123", "email": "user@example.com", "password": "Pass1!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["password"] == "Password must be at least 8 characters long"

# Testoni password pa numra
def test_password_without_number():
    user_data = {"username": "user123", "email": "user@example.com", "password": "Password!"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["password"] == "Password must contain at least one number"

# Testoni password pa karaktere speciale
def test_password_without_special_char():
    user_data = {"username": "user123", "email": "user@example.com", "password": "Password1"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["password"] == "Password must contain at least one special character"

# Testoni moshën e paligjshme
def test_invalid_age():
    user_data = {"username": "user123", "email": "user@example.com", "password": "Password1!", "age": 17}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["age"] == "User must be at least 18 years old"

# Testoni kodin e referimit me gjatësi të gabuar
def test_invalid_referral_code():
    user_data = {"username": "user123", "email": "user@example.com", "password": "Password1!", "referral_code": "REF1"}
    result = validate_user_data(user_data)
    assert result["is_valid"] == False
    assert result["errors"]["referral_code"] == "Referral code must be exactly 8 characters"