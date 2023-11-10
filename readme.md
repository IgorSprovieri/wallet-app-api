# Wallet App API

This is a finances API created using Node, Express and Postgres. The main goal is create an aplication that controls user finances.

- Create, Get, Edit and Delete users
- Get Categories
- Create, Get and Delete finances

## Documentation

Use insomnia to import the file below:

```
https://github.com/IgorSprovieri/wallet-app-API/blob/main/Insomnia.json
```

## Used Technologies

- Node
- Express
- Postgres

## Main Concepts Apllied

- SQL
- Query
- JOIN
- CRUD
- Data Validation
- API Rest
- Middlewares
- Nodemon

## Requirements To Run

- Node.js ([nodejs.org](https://nodejs.org/en/))
- Docker ([www.docker.com](https://www.docker.com))

## Getting Started

1- Clone the repo

```bash
git clone https://github.com/IgorSprovieri/wallet-app-API.git
```

2- Navigate to project folder and Install Dependencies

```bash
cd wallet-app-API
npm install
```

3- Create an PostGres on docker

```bash
Example: docker run --name wallet-app-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -p 5432:5432 -d -t postgres
```

4- Create a .env file following the example

```json
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=docker
DB_HOST=localhost
DB_PORT=5432
```

5- Run script to create tables:

```bash
npm run db:create
```

Observation: if dont't stop press CTRL + C

6- Run the project

```bash
npm run start
```

7- Run the project on dev mode

```bash
npm run dev
```

## Author

<img src="https://media.licdn.com/dms/image/D4D03AQFdLhogHwQVog/profile-displayphoto-shrink_800_800/0/1672976915799?e=1704931200&v=beta&t=3a6TEbH_5gfnLsQ7j-7PTSdWbDnUAz6wd4FT1RNpnR4" alt="Igor Sprovieri" style="width: 30%; border-radius: 50px;">

### _Igor Sprovieri Pereira_

After working as a Unity developer for 3 years, I migrated to the web development area and currently have Fullstack and Mobile knowledge with React, React Native and Node.
