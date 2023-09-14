# Wallet App API

This is a finances API created using Node, Express and Postgres. The main goal is create an aplication that controls user finances.

- Create, Get, Edit and Delete users
- Get Categories
- Create, Get and Delete finances

## Documentation

Use insomnia to import the file below:

```
https://github.com/IgorSprovieri/wallet-app-API/blob/main/Insomnia
```

## Used Technologies

- Express
- Postgres

## Main Concepts Apllied

- SQL
- Query
- JOIN
- CRUD
- Data Validation
- API Rest
- Express
- Nodemon

## Requirements To Run

- Node.js ([nodejs.org](https://nodejs.org/en/))
- Docker ([www.docker.com](https://www.docker.com))

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
Example: docker run --name finances -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
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

<img src="https://media.licdn.com/dms/image/D4D03AQFdLhogHwQVog/profile-displayphoto-shrink_800_800/0/1672976913935?e=1700092800&v=beta&t=wpMCLFnfgmrz3HXW-y9AdaXBSWw7gstVsPHTtTgcyuU" alt="Igor Sprovieri" style="width: 30%; border-radius: 50px;">

### _Igor Sprovieri Pereira_

After working as a Unity developer for 3 years, I migrated to the web development area and currently have Fullstack knowledge with React and Node. I have an app for the Apple Store and Google Play and a library for creating web pages inspired by React.
