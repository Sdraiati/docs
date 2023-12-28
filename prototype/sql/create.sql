-- queries in sql per creare le tabelle

-- crezione tabella project
CREATE TABLE `db_app_techweb`.`project` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `nome` VARCHAR(255) NOT NULL , 
    `descrizione` TEXT NOT NULL , 
    PRIMARY KEY (`id`));

-- creazione tabella user
CREATE TABLE `db_app_techweb`.`user` (
    `email` VARCHAR(255) NOT NULL , 
    `username` VARCHAR(255) NOT NULL , 
    `password` VARCHAR(255) NOT NULL,
     PRIMARY KEY (`email`));

-- creazione della tabella movimento 
-- spesa non sembra essere un nome adatto in quanto implica un
-- importo sempre negativo
CREATE TABLE `db_app_techweb`.`movimento` (
    `id_project` INT NOT NULL , 
    `data` DATETIME NOT NULL , 
    `importo` FLOAT NOT NULL , 
    `descrizione` TEXT NOT NULL , 
    PRIMARY KEY (`id_project`, `data`),
    FOREIGN KEY (`id_project`) REFERENCES (`project`.`id`),
);

-- creazione della relazione tag
CREATE TABLE `db_app_techweb`.`tag` (
    `nome` VARCHAR(255) NOT NULL, 
    `id_project` INT NOT NULL
    PRIMARY KEY (`nome`, `id_project`),
    FOREIGN KEY (`id_project`) REFERENCES (`project`.`id`)
);

-- un tag può essere appartenente a più progetti => relazione tra tag e project 
CREATE TABLE `db_app_techweb`.`tag_project` (
    `id_project` INT NOT NULL, 
    `nome_tag` INT NOT NULL,
    PRIMARY KEY (`id_project`,`nome_tag`),
    FOREIGN KEY (`id_project`) REFERENCES (`project`.`id`),
    FOREIGN KEY (`nome_tag`) REFERENCES (`tag`.`nome`)
);

-- creazione della relazione ricorsiva sui tag
CREATE TABLE `db_app_techweb`.`contiene` (
    `tag_padre` INT NOT NULL, 
    `tag_figlio` INT NOT NULL,
    PRIMARY KEY (`tag_padre`,`tag_figlio`),
    FOREIGN KEY (`tag_padre`) REFERENCES (`tag`.`nome`),
    FOREIGN KEY (`tag_figlio`) REFERENCES (`tag`.`nome`),
);