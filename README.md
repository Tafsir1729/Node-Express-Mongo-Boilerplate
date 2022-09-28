# Node-Express-Mongo-Boilerplate

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A basic boilerplate of Node.js REST API with Express.js set up and no sql database MongoDB.

## Technologies

**Language:** JavaScript <br/>
**Web Framework:** Node.js <br/>
**Server:** Express.js <br/>
**Database:** MongoDB <br/>

## How to use?

To use the boilerplate you have to clone the repository first. To clone the repository using the command given.

```bash
git clone https://github.com/Tafsir1729/Node-Express-Mongo-Boilerplate.git
```

## How to install?

To install and use the boilerplate, your device must have **Node.js** installed. To check if your device already has **Node.js** installed, run the following command on your **command prompt**.

For windows:

```bash
node -v
```

For mac:

```bash
node -v
```

For linux:

```bash
node -v
```

Visual representation of command prompt.

![node version](https://i.ibb.co/cQg6SMS/image.png "node version")

If your device doesn't even have **Node.js** installed, please go to the official website of [Node.js](https://nodejs.org/en/) and install the latest **LTS version** of Node.js.

![nodejs websilte](https://i.postimg.cc/gdJ4VYMD/image.png "nodejs website")

After completing the installation of **Node.js**, please clone the project with the command given in the **How to use?** section and then follow the below steps. You can use your **VS code terminal**.

```bash
  cd express-rest-boilerplate
```

If you are using \*_npm_ then use

```bash
  npm i
```

Or if you are using **yarn** then use

```bash
  yarn install
```

## Connect with database

To connect with MongoDB please go to the **src** folder then open **config** folder.

```bash
  cd src
  cd config
```

and open **conn.js** file and add your database connection string like below:

```js
const dbConnectionString = "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]";
```

## How to run?

For development environment:

```bash
  npm run dev
```

For production environment:

```bash
  npm start
```

## PORT

In the development server by default, it will open at port **5000**, and in the production server, it will open in the server's default port.

## Authors

- [@Tafsir1729](https://github.com/Tafsir1729)

## Contributors

<a href="https://github.com/tafsir1729/Node-Express-Mongo-Boilerplate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tafsir1729/Node-Express-Mongo-Boilerplate" />
</a>
