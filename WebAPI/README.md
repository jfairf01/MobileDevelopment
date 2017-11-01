# Template Web API - A Flask-SQLAlchemy-Heroku API

## Setting up

##### Clone the repo

```
$ git clone git@github.com:jfairf01/MobileDevWebAPI.git
```

##### Install All Dependencies

To install the dependencies, run the following command;

```
$ ./installDependencies.sh
```

##### Initialize your local PostgreSQL database

Open a new terminal window and run this command;

```
$ ./initializeLocalDB.sh
```


##### Initialize your database with fake data

In the main directory run the following;

```
$ ./setupdb.sh
```

##### Running the app

```
$ ./startApp.sh
```

Each file holds comments describing what the dependencies are;

If your system does not run them, look online to find the alternative method of running them on your system.


To see if your app works, once you start it open a browser and type in the following URL;

```
http://localhost:5000/first_names
```

It should output a list of JSON names from your database


