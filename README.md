# rest_api_adonisJS

# Running the Application with MySQL Database

Prerequisites:

Node.js: Version 21
npm: Version 10.3.0
MySQL: Installed and running locally

Environment Variables:

Create a .env file in the project root.

Add the following variables:

PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=QJg0HQRGnXxlsDH22xqNIagG8uqNZdeZ
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=Sol@1621
MYSQL_DB_NAME=sol_db

Can replace those strings on you own





2.Installation:

Clone the repository:

git clone https://github.com/your-username/your-repository.git

Install dependencies:

cd your-repository
#Use --force suffix if some package can't installed
npm install
npm i @adonisjs/lucid@18.4.0    
npm install @adonisjs/auth@alpha --force   




Database Setup:

Create the database:

mysql -u your-mysql-username -p
CREATE DATABASE your-database-name;

Run migrations:
node ace migration:run



Running the Application:

Start the development server:

node ace serve --watch





# Postman Collections

Use This file inside the project

rest_api_adonisJS.postman_collection.json



Thank You!
