# MobileDevelopment
A Public repo for the creation of a mobile application. This application was created with the help of Claudia Mihm and Sara Goldstein-Weiss.

# Engineering Notebook

## Entry 1: Friday, September 22nd, 2017

## Project Proposal

### Need for the App:

Living with people can be difficult. Especially in college, when nobody has quite enough time to organize chores, make food, or pay the bills. There is a need for an app that can help housemates organize all things that come with living together, to take the burden and responsibility off of any one person while keeping all of those in the house responsible for their house duties.
    
    
### Target Audience:

College students living in apartments or off-campus houses who need help organizing their living situations. 
    
### People and stakeholders: 

Our Housemates are our primary stakeholders and supporters. Several of them have expressed a need/interest in our app, and we hope to continue consulting them as we build out our idea.
    
### Statements of support:

One of Claudia’s housemates: “We usually struggle with making sure everyone is paid back for all of our bills and such, so having an app would be a nice way to make sure that we could actually coordinate that easily.”
    
Another one of Claudia’s housemates: “My floor of the house is not good at doing chores. If the app made that easier, I would definitely use it.”

### List and briefly describe the core functionality of the app, the most important functions and transactions of the app.

The app will allow users to create groups of their housemates. Features include:
        * Chore wheel: users can enter a list of chores, and the app will split the chores between all the housemates. The app can also send reminders and set deadlines for the chores to be completed. 
        
        * Messaging: Housemates can post messages and receive responses within the app
        
        * Bills: For things like rent and utilities, users can post the amount one person paid, and the app will split the cost between all housemates, and keep track of how much each individual owes. 


### List and briefly describe the secondary functionality of the app, the functions and transactions of the app that are nice to have only if time allows.

* Calendar of upcoming events such as house gatherings/meetings, individuals hosting parties so that others will be notified, etc.

* Poll creation so that house matters revolving around gatherings/trips can be agreed upon. 

* When to Meet integration to create time slots that allow users to enter times they can meet for certain things

* Venmo integration for bill paying 

### List the features on a mobile device that the app will use (e.g., camera, GPS, SMS, flashlight).

* SMS - messaging amongst the people in the house

* Venmo integration

### Briefly describe any limitations each team member may feel that will hold back progress.

We will be using ReactNative, and Sara and Johnny have never used it. We imagine there will be a bit of a learning curve, but are excited to learn and use a new technology. Claudia has developed in React before and is familiar with the technology so hopefully will be able to provide some knowledge about the structure of React. Another concern some of us have is simply learning all of the consideration we will have to make for mobile development that we do not have to navigate with other platforms.  

## Entry 2: Tuesday, October 3rd, 2017

### A wireframe of the app: 
* [Wireframe](http://9md4kk.axshare.com/#g=1&p=open)
* [Architecture](http://garanw.axshare.com/#g=1)


### A preliminary list of third-party APIs we will need

* [GroupMe](https://dev.groupme.com/) - for a housemate group chat
* [Google Calendar](https://developers.google.com/google-apps/calendar/) – for shared events
* [Venmo](https://developer.venmo.com/) – to settle shared bills
* [Material Design Kit](http://www.xinthink.com/react-native-material-kit/) – if we want to use material design

# Entry 3: October 10th, 2017

### Overview

Based on the requirements that have been laid out in front of us, we have decided to split up the work amongst us in the following manner;

* Database/API - Johnny
* Third Party Integration - Claudia
* User Interface - Sara

#### Database/API:

Based on the requirements of our application to be able to serve multiple mobile devices ‘live’ data that is variable, we can not only use a local database such as Realm or SQLite on each phone. We will need a live server API that the mobile phones are able to hit so that they are able to retrieve and send data such that it is updated to everyone else’s phone to have uniform data across platforms.

Thinking about the optimization of the application, we would also like to have the local database set up on each person’s phone so that the application will be available to them even if they do not have access to the internet.

Because of this, we are going to move forward using a PostgreSQL database served on a Heroku server, and use Flask (python) as the API for the users to hit. We will also install Realm databases on each user’s phone so that they will be able to use the application even when they are offline and will be able to refresh their data on a timed basis and if they send a request via refresh such as a swipe up action.

For the MVP we will only be using the live data - i.e. we will set up only the Flask-PostgreSQL-Heroku API for the mobile devices to hit.

#### User Interface

We’ll be implementing based on Claudia’s previous wireframes, with some slight edits. In the feedback we got from class, we were advised to use the chore chart as the landing page after login, rather than having a dashboard. Also, since we’re starting with the MVP, we are only implementing a chore chart for the moment, not the messaging, calendar, or bill paying aspects.

This is my (Sara’s) first time working with React Native, so it took me some extra time to just familiarize myself with the available components. React is very young and changing quickly, so sometimes it’s hard to keep track of what is supported in a specific version. I ran into this issue when I tried to make use of the CheckBox component listed in the React Docs, only to discover that it wasn’t available in the version of React I was using. As a temporary workaround I used switches in the place of CheckBoxes.

### Authentication: 

We want to set up some form of authentication, so that users can log in and create houses and accounts easily, and so that we can keep track of houses and who is using our app. To do this, we researched a few platforms for authentication. 

I (Claudia)  was initially working on setting up Facebook authentication through React-native-fbsdk. I was running into a large number of issues, mostly with a lack of documentation for the older versions, and version clashing. I spent a large amount of time trying to debug these, only to uncover more bugs. I will continue investigating/search for other options because this one is very slow going. 


# Entry 4: October 17th, 2017

#### Database/API initialization

Because I (Johnny) have worked with this kind of API, there were not a lot of issues/learning curves that came with this project. Because of that, the setup and creation of this application has gone very smoothly. I have created a public repo that holds the installation directions as I am creating this application so that for future projects, I will be able to draw from it. I have also made it public so that if anyone else would like to use this same style of API that they can do so.

You can find the repo at the following URL;

```
$ https://github.com/jfairf01/Flask-PostgreSQL-Heroku-API
```

Helpful pages that can help to explain the setup/documentation for each of these different components are listed below;

```
$ http://flask.pocoo.org/
$ https://www.postgresql.org/
$ https://devcenter.heroku.com/
```

#### Working on the Interface

As I got up and running with React Native, I set up a list of chores with artificial data that I hardcoded to get some of the basic functionality down without worrying about hitting the API. As I got a certain view laid out the way I wanted, I would then pause from layout to set up API calls and populate the view with database entries.
We learned a lesson about the importance of communication during development when Claudia and I thought that an API call was written wrong, only to find out that Johnny was changing part of the database at the same time and the response errors we were running into were due to the work he was doing. 

### Authentication: 

During class, one of our classmates gave a lightning talk about Firebase. It seemed as though Firebase easily incorporated authentication, so I decided to look into it. It was, in fact, much easier to incorporate than FBSDK, and the initial setup ran smoothly, thanks to documentation. However, we ran into a bug where the emulators for Android 6 do not have Google Play, while real Android 6 phones do. This took me a long time to discover, so the application was working, and the holdup was in the emulator. However, now we have working email authentication, where a user can login or signup with an email and a password. 

# Entry 5: October 24th, 2017

#### Finishing the MVP Database, Server, and API

As I was working with the database and integrating its use/adding tables/columns to the database, I did not want to overwrite any data that was in the development environment that Claudia and Sara were hitting, so I had to learn how to migrate my changes from my database to my developer database. 

When you update your database in your python models, to safely update them using Flask Migrate, use the following commands;

```
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```

* A fun little thing I just learned while trying to remember what commands they were; if you’re in terminal and you type Ctl + r you’re brought to a search where you can search your command history like ‘grep’.

* Currently the API is not secure (anyone can access it), so once we have user authentication in Flask we can create authorization keys so that users on their mobile devices will be the only ones able to access the API

#### MVP interface

I ran into some issues with using the Modal component because I tried to set up a new `<ChorePicker>` component with a modal, and import that into a Chore component, only to find that the modal would not stay closed because the ChorePicker element had no way to change the parent element’s state and indicate that the modal should not be visible. I fixed the problem by using a `<Modal>` within the Chore component.

We sacrificed usability to get functionality up and running in a time crunch, so we have a few things to update for the future. For example, there’s currently a “refresh” button. Manually refreshing after changing a chore is a nuisance to the user, so ideally this will be unnecessary if we can cause the dashboard parent component to rerender when a user is assigned a new chore.

### Authentication: 

We are currently trying to figure out how to connect our two databases -- while Firebase makes authentication very easy, the rest of our data is in a different database, so fetching data and communicating between those is a challenge. However, we have a workaround, where we use the initial Firebase database to log in, and our Web API for everything else. This is almost complete, and will hopefully be merged into Alpha this week. 


# Entry 6: November 9th, 2017

### Overview
We once again divided up the work between the three of us: 
Claudia: Lint Testing
Sara: Crashlytics
Johnny: Unit Testing and Analysis on Web API

### Lint Testing
The majority of our lint bugs were found in code that we had not directly written, but came with the react-native app that we created. There were four categories of warnings: 
DefaultLocale: implied default locale in case conversion
This was handled by importing locale, and specifying to be in the US
GradleDependency: Obsolete Gradle Dependency
This is a product of the fact that we are using Android version 6, and thus our dependencies are not the newest. To handle this error, I edited the gradle.build file to suppress this error. 
Registered: Class not registered in the manifest
This was two packages that were downloaded with firebase -- to address them, I made the classes abstract. This means that they did not need to be registered in the manifest. 
GradleDynamicVersion: Gradle Dynamic Version
We originally had the line: compile 'com.facebook.react:react-native:+' in one of our build.gradle files. Using the + can lead to strange bugs and errors, so I fixed this error by hardcoding the version number.



### Crashlytics Testing
We set up crashlytics to track crashes and find their causes. To install crashlytics, we followed the steps at [this blog post](https://medium.com/komenco/beta-testing-your-react-native-android-application-with-crashlytics-483c7e66a423) and installed [react-native-fabric](https://github.com/corymsmith/react-native-fabric).

For future reference, the blog post shows several useful steps including how to generate a signed certificate and how to create a release build. And the command `react-native run-android --variant=release` installs a release build on the Android SDK.

We created a test crash using crashlytics and confirmed that it’s properly installed.


