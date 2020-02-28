## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm i

docker-compose up -d
npm run typeorm # this should fail with Not enough non-option arguments: got 0, need at least 1
npm run migration

npm run build
```

## Running the app

```bash
npm run start:prod
```

## API

```bash
# retrieve jokes
curl --location --request POST 'http://localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{}'

# get JWT
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username": "admin",
	"password": "admin"
}'

# get Categories
curl --location --request GET 'http://localhost:3000/categories' \
--header 'Authorization: Bearer TOKEN_HERE' \
--data-raw ''

# Update Category
curl --location --request PUT 'http://localhost:3000/category' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer TOKEN_HERE' \
--data-raw '{
    "id": 1,
    "isBanned": true
}'
```

## Notes

- POST over GET because it is easier to manage request options in body
- node-fetch over axios (or got) because it has been already in use by nestjs

Spent 2h on initial commit (issues with development environment on local machine)  
Spent 3h on Docker setup and DB initialization
Spent 2h on Auth module
Spent 30m on Update requests

TODO:
- Fix Dockerfile (smth with dist in 2nd container)
- Setup production ready solution
- Test edge cases (performance)
