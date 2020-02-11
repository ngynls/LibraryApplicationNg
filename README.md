# LibraryApplicationNg
This repository contains my solution for a library management information system built using the MEAN stack. 

## Technologies used:
* MongoDB/Mongoose/MLab
* Express
* Angular
* NodeJS
* Material Design
* Heroku
* ng2-charts/Chart.js

## Features
- [x] Login page with authentication using JWT
- [x] Dashboard page with member, books and book copies stats
- [x] Chart for the distribution of book copies by status (Available, On Loan, Reserved) using ng2-charts & Chart.js
- [x] Create/Read/Update/Delete operations for all the models in the domain (Authors, Books, Book Copies, Loaned Books, Genre, Members, Publishers, Reservations)
- [x] Deployed the app to Heroku (url located down below)
- [x] Containerized for development with Docker.
- [x] Integration with Swagger UI for API documentation

## Screenshots
![Screenshot #1](https://i.imgur.com/WKcHZfr.png)
![Screenshot #2](https://i.imgur.com/YUXwRmY.png)
![Screenshot #3](https://i.imgur.com/xNS16Q9.png)
![Screenshot #4](https://i.imgur.com/h1zDLyI.png)
![Screenshot #5](https://i.imgur.com/tNmzVku.png)

## Usage
Clone the project, then use the `npm install` command in the parent folder & in the client folder to install all the necessary dependencies to run this app.

In the config folder, create a file named keys.js containing your mongodb/mlab url & JWT secret.

```
module.exports={
    mongoURL: "mongodb:username:password@ds012345.mlab.com:56789/dbName",
    JWT_SECRET: "yoursecrethere"
};
```

For local development, run `node server.js` to activate the server. Then run `ng serve -o` in the client folder.

To run the app with Docker, use the `docker-compose build` command to build the services, then `docker-compose up` to start the containers.

Note for using Docker:
If you are using Docker Toolbox on Windows, then use `apiUrl:'http://192.168.99.100:5000/api'` inside environment.ts. However, if you are using Docker for Windows or Docker for Mac, then use `apiUrl:'http://localhost:5000/api'`.

## Demo
To login, please use these credentials.

Username: admin
Password: admin1234

Url: https://secret-inlet-88757.herokuapp.com/

