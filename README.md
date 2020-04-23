# Simple Sign-in/sign-up project by React & Node & Postgre


- Installation (Postgre)

	Depending on the OS, we have several ways to install Postgre

	* Windows
	   Download the app from http://www.enterprisedb.com/products-services-training/pgdownload#windows
	   Follow the guide in http://www.postgresqltutorial.com/install-postgresql/

	* MacOS
	   Download the app from http://postgresapp.com/ and install

	* Ubuntu
	   Run this command in terminal 
	        sudo apt-get install postgresql postgresql-contrib
    * Fedora
       sudo yum install postgresql93-server
- Generating DB
    
    Run console application and run this command 

    `psql`

    `create user developer;`

    `create database test owner developer;`

    `use test`

    `create table tblusers (
    	id  SERIAL PRIMARY KEY,
   username TEXT  NOT NULL,
   email    TEXT  NOT NULL,
   password TEXT   
    	)`

- Installation (backend)

  git clone ....

  cd backend

  npm install

  node index.js &

- Installation (front-end)

  cd ../frontend

  npm install

  yarn start 




