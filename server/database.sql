CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email_address VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(128) NOT NULL,
    password_salt VARCHAR(32) NOT NULL
);

CREATE TABLE UserProfiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    date_of_birth DATE,
    profile_image INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE UserPermissions (
    permission_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    permission_level INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE CuisinePreferences (
    preference_id SERIAL PRIMARY KEY,
    preference_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE UserCuisinePreferences (
    user_id INT NOT NULL,
    preference_id INT NOT NULL,
    PRIMARY KEY (user_id, preference_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (preference_id) REFERENCES CuisinePreferences(preference_id)
);

CREATE TABLE Recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_name VARCHAR(50) NOT NULL,
    recipe_description VARCHAR(250),
    recipe_instructions VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE NutriInfo (
    nutriinfo_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    nutrient_dictionary VARCHAR NOT NULL
)

CREATE TABLE RecipeIngredients (
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL,
    ingredient_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
    image_description VARCHAR(50),
    image_store VARCHAR NOT NULL
);

CREATE TABLE Posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    body VARCHAR(500),
    image_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (image_id) REFERENCES Images(image_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    body VARCHAR(250) NOT NULL,
    upvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

CREATE TABLE Replies (
    reply_id SERIAL PRIMARY KEY,
    parent_id INT NOT NULL,
    parent_type VARCHAR(10) NOT NULL CHECK (parent_type IN ('comment', 'reply')),
    user_id INT NOT NULL,
    body VARCHAR(250) NOT NULL,
    upvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Upvotes (
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    item_type VARCHAR(10) NOT NULL CHECK (item_type IN ('post', 'comment', 'reply')),
    PRIMARY KEY (user_id, item_id, item_type),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Notifications (
    notif_id INT NOT NULL,
    user_notifying_id INT NOT NULL,
    user_sent_id INT NOT NULL,
    notif_type VARCHAR(10) NOT NULL CHECK (notif_type IN ('comment','reply','upvote'))
);
