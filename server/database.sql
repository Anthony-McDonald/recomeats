CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    email_address VARCHAR(50) UNIQUE,
    password_hash VARCHAR(128),
    password_salt VARCHAR(32)
);

CREATE TABLE UserProfiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    date_of_birth DATE,
    profile_image INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserPermissions (
    permission_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    permission_level INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserCuisinePreferences (
    user_id INT,
    preference_id INT,
    PRIMARY KEY (user_id, preference_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (preference_id) REFERENCES CuisinePreferences(preference_id)
);

CREATE TABLE CuisinePreferences (
    preference_id SERIAL PRIMARY KEY,
    preference_name VARCHAR(50) UNIQUE
);

CREATE TABLE Recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INT,
    recipe_name VARCHAR(50),
    recipe_description VARCHAR(250),
    recipe_instructions VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE RecipeIngredients (
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id INT,
    ingredient_name VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);
