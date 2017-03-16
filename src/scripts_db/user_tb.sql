create table praqueacucar.useraccount (
	id int key not null AUTO_INCREMENT, 
    email varchar(255) not null, 
    password varchar(24) not null,
    token varchar(2000) null,
    active bit not null,
    lastAuthentication datetime null
    )

    INSERT INTO `praqueacucar`.`useraccount`
(`email`,
`password`,
`token`,
`active`,
`lastAuthentication`)
VALUES
("rz.vieira@outlook.com",
"valor123",
null,
1,
null);
SELECT * FROM praqueacucar.useraccount;