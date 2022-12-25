# Wallet App API

## Intro

This is and API created usind Node.js, Express and PostGresSQL.
The main goal is create an aplication that controls user finances

## Requirements

- Node.js
- Docker

## Documentation:

```
Use insomnia to import the file below:
https://github.com/IgorSprovieri/wallet-app-API/blob/main/Insomnia
```

## Steps to run the project

1. Clone the project

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

7. Run the project with nodemon

```
npm run start:dev
```
