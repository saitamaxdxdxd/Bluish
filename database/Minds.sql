CREATE TABLE Minds(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    birth VARCHAR(32) NOT NULL
);

/* New Mind table */

CREATE TABLE Minds(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    active INT DEFAULT 0,
    token VARCHAR(200) DEFAULT null,
    birth VARCHAR(32) NOT NULL
);