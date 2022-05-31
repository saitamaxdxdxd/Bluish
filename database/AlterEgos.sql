CREATE TABLE AlterEgos(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(25) NOT NULL,
    token VARCHAR(50),
    birth VARCHAR(32) NOT NULL,
    publicMind INT DEFAULT 1,
    publicAlterEgo INT DEFAULT 1,
    mind uuid,
    FOREIGN KEY (mind) REFERENCES Minds(id) ON DELETE CASCADE
);

/* New Alterego table */

CREATE TABLE AlterEgos(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(35) NOT NULL,
    image VARCHAR(150),
    token VARCHAR(50),
    publicMind INT DEFAULT 1,
    publicAlterEgo INT DEFAULT 1,
    birth VARCHAR(32) NOT NULL,
    mind uuid,
    FOREIGN KEY (mind) REFERENCES Minds(id) ON DELETE CASCADE
);
