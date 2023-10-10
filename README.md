# RTSBuildOrderBuilder

A project website to share rts build orders

# How to run locally:

- Pre-requisites: Node (version 18 and above should be fine), npm, Visual Studio 2022, MongoDb-windows
- Front-end:
  - After cloning the repo, navigate to the /App directory
  - Run `npm install`
  - Run `npm run start` and it should run the web app
  - If you wanna run jest tests, use `npm run test`
- Back-end:
  - Open `Backend.sln` file using Visual Studio
  - To create an initial database with mock data, run the `DatabaseConsole` project
  - The app assumes a mongodb local connection on `mongodb://localhost:27017`. If you have a different one, the connection string on `appsettings.development` and
    `SetupLocalDatabase.cs` need to be changed
  - After the above step you should have a Database called `RTSBuildOrderBuilder` (you can use `MongoShell` or `MongoDb Compass` to check that), the `appsettings.development` will point to this database by default so no changed should be required to the file
  - Now run the Api project and the api should start and interact with the mock data
  - If you wanna run tests, just run the `Tests` project

# This is not a finished app, there is a lot of mock and placeholder content

- For now the user authentication is just a simple mock, you can click on Login to become a random user
