# Sequelize API

This was a really rewarding project and my first of many using an ORM. In the future, I plan to redo this project using Typescript, as using Node to do it was not optimized for development.

This project used Joi, JWT, and Sequelize. It was also made with a Model, Service, and Controller architeture.

## Executing it

Provided you have Docker and docker-compose installed on your machine, you may follow the commands below in your terminal to see the API working:

```sh
$ docker-compose up -d
$ docker exec -it blogs_api bash
```

It should open the bash version of the newly created container. After that, you can install the project's node_modules and start the API.

```sh
$ npm install
$ npm start
```

If you want to check how the tests are working, you can either go to the tests directory or execute the testing script with:

```sh
$ npm run test
```

If you would like any help executing it or if you have any suggestion on how to improve this code, please reach me out!

pedroscsilva2001@gmail.com 

+55 24 99243-3741
