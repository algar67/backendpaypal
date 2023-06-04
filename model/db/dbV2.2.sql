CREATE DATABASE paypulp_v2;


CREATE TABLE users (
	user_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	email varchar(80) NOT NULL UNIQUE,
	password varchar(32) NOT NULL,
	first_name varchar(50) NOT NULL,
	account_type varchar(15) NOT NULL DEFAULT 'personal',
	funds numeric NOT NULL DEFAULT '0',
	CONSTRAINT users_pk PRIMARY KEY (user_id)
);


CREATE TABLE login_statistics (
	login_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL,
	login_date timestamp NOT NULL DEFAULT current_timestamp,
	logout_date timestamp
);


CREATE TABLE personal_info (
	personal_info_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	last_name varchar(50) NOT NULL,
	phone varchar(20) NOT NULL,
	birth_date DATE NOT NULL,
	gender varchar(50) NOT NULL,
	address varchar(100) NOT NULL,
	city varchar(50) NOT NULL,
	state varchar(50) NOT NULL,
	country varchar(50) NOT NULL,
	time_zone varchar(10) NOT NULL,
	preferred_business varchar(50) DEFAULT 'no data',
	CONSTRAINT personal_info_pk PRIMARY KEY (personal_info_id)
);


CREATE TABLE user_statistics (
	user_statistics_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	churn_risk integer NOT NULL DEFAULT 0,
	creation_time timestamp NOT NULL DEFAULT current_timestamp,
	is_inactive BOOLEAN NOT NULL DEFAULT FALSE,
	is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT user_statistics_pk PRIMARY KEY (user_statistics_id)
);


CREATE TABLE seller_info (
	seller_info_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	seller_name varchar(50) NOT NULL UNIQUE,
	category varchar(30) NOT NULL,
	store_address varchar(50),
	store_address_add_info varchar(50),
	CONSTRAINT seller_info_pk PRIMARY KEY (seller_info_id)
);


CREATE TABLE qr_links (
	qr_link_id serial NOT NULL,
	seller_uuid varchar(40) NOT NULL,
	checkout_type varchar(15) NOT NULL,
	total_amount numeric,
	link_slug varchar(40) NOT NULL UNIQUE,
	CONSTRAINT qrLinks_pk PRIMARY KEY (qr_link_id)
);


CREATE TABLE transactions (
	transaction_id serial NOT NULL UNIQUE,
	transaction_uuid varchar(40) NOT NULL UNIQUE,
	seller_uuid varchar(40) NOT NULL,
	buyer_uuid varchar(40) NOT NULL,
	payment_method_uuid varchar(40) NOT NULL,
	total_amount numeric NOT NULL,
	user_completed BOOLEAN NOT NULL,
	went_through BOOLEAN NOT NULL,
	transaction_time timestamp NOT NULL DEFAULT current_timestamp,
	geolocation varchar(100),
	CONSTRAINT transactions_pk PRIMARY KEY (transaction_id)
);


ALTER TABLE "qr_links" ADD CONSTRAINT "qr_links_fk0" FOREIGN KEY ("seller_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "login_statistics" ADD CONSTRAINT "login_statistics_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "user_statistics" ADD CONSTRAINT "user_statistics_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "seller_info" ADD CONSTRAINT "seller_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("seller_uuid") REFERENCES "users"("user_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("buyer_uuid") REFERENCES "users"("user_uuid");



