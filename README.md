# CarFetching

## Guides to setup

1. Download [node.js](https://nodejs.org/en/)

2. Download [npm](https://www.npmjs.com/)

3. (Optional) Download git bash

4. Download PostgresSQL

5. Open git bash, or other terminals

6. Git clone this repo

7. Go to the repo's directory, run the following to install the dependencies.:

```
npm install
```

8. Run `npm start`

## How to call the functions

1. Select all: `localhost:3000/api/drivers`

2. Select one: `localhost:3000/api/drivers/{number}`

3. Create: `curl --data "id=2name=LaoSiJi&age=37&sex=male&carNumber=A1234" \
localhost:3000/api/drivers`

4. Update: `curl -X PUT --data "name=MaLuShaShou&age=20&sex=male&carNumber=D8888" \
localhost:3000/api/drivers/{id}`

5. Delete: `curl -X DELETE localhost:3000/api/drivers/{id}`
