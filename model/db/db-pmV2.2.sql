CREATE DATABASE payment_methods;


CREATE TABLE payment_methods (
	pay_method_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL,
	payment_method_uuid varchar(40) NOT NULL UNIQUE,
	card_number varchar(25) NOT NULL,
	card_owner_name varchar(50) NOT NULL,
	CONSTRAINT payment_methods_pk PRIMARY KEY (pay_method_id)
);

