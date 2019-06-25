To test codes with Jest and Supertest after building a RESTful API using Node.js in JavaScript in last project
============
## setup by the commands below #
1. Installation from package.json
> npm install
* we will use "mysql", "express", "body-parse", "esm", "nodemon", "node-dev" to run ES6 code
2. or you can also use <u><i>npm i PACKAGES -D</i></u> to install them for development manually
3. Test the code using Jest
> npm run test
* testing codes built with ES6 JavaScript needs package Babel-jest when testing
* using Supertest for simple HTTP reqest/responss
4. the test script uses package node-dev to watch the code continoualy in modification, and package esm to compile ES6 JavaScript
> npm run dev
* or you can run the code once using node or nodemon
------------
References
------------
1. https://jestjs.io/docs/en/getting-started
2. https://medium.com/enjoy-life-enjoy-coding/讓-jest-為你的-code-做單元測試-基礎用法教學-d898f11d9a23
