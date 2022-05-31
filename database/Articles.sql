CREATE TABLE Articles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    information VARCHAR(10000) NOT NULL,
    birth VARCHAR(32) NOT NULL,
    theme uuid,
    author uuid,
    FOREIGN KEY (author) REFERENCES AlterEgos(id) ON DELETE CASCADE,
    FOREIGN KEY (theme) REFERENCES Themes(id) ON DELETE CASCADE
);

// bibliography