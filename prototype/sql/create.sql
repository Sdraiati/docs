-- queries in sql per creare le tabelle

-- crezione tabella project
CREATE TABLE project (
    id INT NOT NULL AUTO_INCREMENT , 
    nome VARCHAR(255) NOT NULL , 
    descrizione TEXT NOT NULL , 
    PRIMARY KEY (id));

-- creazione tabella user
CREATE TABLE user (
    email VARCHAR(255) NOT NULL , 
    username VARCHAR(255) NOT NULL , 
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);

-- creazione della tabella movimento 
-- spesa non sembra essere un nome adatto in quanto implica un
-- importo sempre negativo
CREATE TABLE movimento (
    id_project INT NOT NULL , 
    data DATETIME NOT NULL , 
    importo FLOAT NOT NULL , 
    descrizione TEXT, 
    PRIMARY KEY (id_project, data),
    FOREIGN KEY (id_project) REFERENCES (project.id),
);

-- creazione della relazione tag
CREATE TABLE tag (
    nome VARCHAR(255) NOT NULL, 
    id_project INT NOT NULL,
    descrizione TEXT , 
    PRIMARY KEY (nome, id_project),
    FOREIGN KEY (id_project) REFERENCES (project.id)
);

-- un tag può essere appartenente a più progetti => relazione tra tag e project 
CREATE TABLE tag_project (
    id_project INT NOT NULL, 
    nome_tag INT NOT NULL,
    PRIMARY KEY (id_project,nome_tag),
    FOREIGN KEY (id_project) REFERENCES (project.id),
    FOREIGN KEY (nome_tag) REFERENCES (tag.nome)
);

