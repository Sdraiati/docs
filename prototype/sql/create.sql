-- queries in sql per creare le tabelle

-- crezione tabella progetto
CREATE TABLE progetto (
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
-- il campo tag può essere nullo
CREATE TABLE movimento (
    id_progetto INT NOT NULL , 
    data DATETIME NOT NULL , 
    importo FLOAT NOT NULL , 
    descrizione TEXT, 
    tag VARCHAR(255) NULL,
    PRIMARY KEY (id_progetto, data),
    FOREIGN KEY (id_progetto) REFERENCES progetto(id),
    FOREIGN KEY (tag) REFERENCES tag(nome),
);

-- creazione della relazione tag
CREATE TABLE tag (
    nome VARCHAR(255) NOT NULL, 
    id_progetto INT NOT NULL,
    descrizione TEXT , 
    PRIMARY KEY (nome, id_progetto),
    FOREIGN KEY (id_progetto) REFERENCES progetto(id)
);

-- un tag può essere appartenente a più progetti e  
-- più progetti possono averse lo stesso tag.
-- => relazione molti a molti tra tag e progetto

CREATE TABLE tag_progetto (
    id_progetto INT NOT NULL, 
    nome_tag VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_progetto,nome_tag),
    FOREIGN KEY (id_progetto) REFERENCES progetto(id),
    FOREIGN KEY (nome_tag) REFERENCES tag(nome)
);

