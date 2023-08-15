create database bcb;
use bcb;
create table clientes (
	id_cliente int primary key auto_increment,
    nome varchar(60) not null,
    tel varchar(11) not null,
    email varchar(60) not null,
    cpf varchar(11) not null,
    cnpj varchar(14),
	nome_empresa varchar(60),
    id_plano int not null,
    limite DECIMAL(10, 2) not null
);

create table clientes_mvto (
	id_mvto int primary key auto_increment,
    id_cliente int not null,
    descricao varchar(60) not null,
    tipo_mvto varchar(1) not null,
    saldo DECIMAL(10, 2) not null,
    data_mvto date not null
);

create table clientes_saldo (
    id_cliente int not null,
    saldo DECIMAL(10, 2) not null
);

create table usuarios (
	id_usuario int primary key auto_increment,
    nome varchar(30) not null,
    senha varchar(15) not null,
    id_cliente int not null
);

create table enviosms (
	id_sms int primary key auto_increment,
    id_cliente int not null,
    envia_whatsapp varchar(1) not null,
    tel_destinatario varchar(11) not null,
    texto varchar(500) not null,
    data_envio date not null,
    id_mvto int not null
);

create table cadplano (
		id_plano int primary key auto_increment,
		descricao varchar(30) not null,
        flag_usa_limite varchar(1) not null
);

insert into cadplano (descricao, flag_usa_limite) values ('PRÉ PAGO', 'N');

ALTER TABLE clientes ADD CONSTRAINT fk_plano_cliente FOREIGN KEY ( id_plano ) REFERENCES cadplano ( id_plano );
ALTER TABLE clientes_mvto ADD CONSTRAINT fk_cliente_mvto FOREIGN KEY ( id_cliente ) REFERENCES clientes ( id_cliente );
ALTER TABLE clientes_saldo ADD CONSTRAINT fk_cliente_saldo FOREIGN KEY ( id_cliente ) REFERENCES clientes ( id_cliente );
ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_cliente FOREIGN KEY ( id_cliente ) REFERENCES clientes ( id_cliente );
ALTER TABLE enviosms ADD CONSTRAINT fk_sms_cliente FOREIGN KEY ( id_cliente ) REFERENCES clientes ( id_cliente );
ALTER TABLE enviosms ADD CONSTRAINT fk_sms_mvto FOREIGN KEY ( id_mvto ) REFERENCES clientes_mvto ( id_mvto );
