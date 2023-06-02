# Wallet App API

This is a finances API created using Node.js, Express and Postgres. The main goal is create an aplication that controls user finances.

- Create, Get, Edit and Delete users
- Get Categories
- Create, Get and Delete finances

## Main Concepts Apllied

- SQL
- Query
- JOIN
- CRUD
- Data Validation
- API Rest
- Express
- Nodemon

## Live Application

[api.wallet-app.ispapps.com](Https://api.wallet-app.ispapps.com)

This api has a prod link deployed with Railway

## Documentation

Documentation explain the routes:

Use insomnia to import the file below:

```
https://github.com/IgorSprovieri/wallet-app-API/blob/main/Insomnia
```

## Requirements To Run

- Node.js
- Docker

## Getting Started

1. Clone the repo

```
git clone https://github.com/IgorSprovieri/wallet-app-API.git
```

2. Navigate to project folder and Install Dependencies

```
cd wallet-app-API
npm install
```

3. Create an PostGres on docker

```
Example: docker run --name postgres-finances -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
```

4. Create a .env file following the example

DB_USER=docker
DB_PASSWORD=docker
DB_NAME=finances
DB_HOST=localhost
DB_PORT=5432

5. Run config script to create database and table:

```
npm run config:init
Observation: if dont't stop press CTRL + C

```

6. Run the project

```
npm run start
```

7. Run the project on dev mode

```
npm run start:dev
```

## Author

<img src="./public/images/myImage.jpeg" width="22%">

### _Igor Sprovieri Pereira_

In 2013 I learned to programming games how as a hobbie, in 2020 I started to work on this area, I did some freelancers, opened my game studio and I was a writter for over a year on site crieseusjogos.com. In 2022 I decided to go a web developer professional and today I am fullstack with react and node
