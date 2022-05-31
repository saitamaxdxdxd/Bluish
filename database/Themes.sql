CREATE TABLE Themes(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(200) NOT NULL,
    idTheme uuid,
    FOREIGN KEY (idTheme) REFERENCES Themes(id) ON DELETE CASCADE
);

/* 
ALTER TABLE themes ADDbirth VARCHAR(32) NOT NULL;
 */