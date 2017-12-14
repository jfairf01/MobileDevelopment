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



### Leg 7: App Update and Reflection 

The majority of our time post-launch has been dedicated to an unfortunate bug where our app runs smoothly on our emulator, but after we package it into an apk file, it shows a blank screen after the login screen. At this point, we have not figured out why this bug is happening. Some steps we took to try to fix this problem: 
Eliminated all the warnings that we had, mostly due to us mishandling the state in React Native. 
Building the APK through Android Studio, in case the way we were generating it was creating the bug. 
We removed several packages that were giving us warnings in our logs, which we accessed by running ‘adb logcat.’ 
We removed Firebase, which was causing some versioning issues in the past. 
We changed the navigation structure, removing a package we believed was causing errors and replacing it with the react-native navigation package. 

#### Update: functional navigation!

We spent a lot of time working to improve this issue (created an even bigger bug along the way) and finally were able to build a functional APK yesterday! We tried several things, including changing our navigation package, but what finally worked was upgrading our version of React Native and using the new navigation structure.

One significant learning experience that came out of this was that we made use of the Google Play store’s Beta option. We got our friends to test out our app to prove that it worked out in the wild before we released it to the public. Without this bug I don’t think we would have recognized the full potential of that process, and now we know how to use the Beta testing feature in the future!


#### Claudia’s Response: 
1. What did you learn technically?
While I had some experience with React, I definitely gained some new skills in React-Native. One of the big technical skills I gained (slowly) is how to build an app with compatible versioning for all packages. I also used to think that mobile was pretty similar to web development, but I have learned that in terms of testing, launching, and design, mobile is a very different field. 
2. What did you learn professionally? Please note: this is not the same as the above question.
I gained skills at working on a team, dividing up and merging code, and making sure that we all had a shared vision for the apps. We at points hit some roadblocks because we had differing ideas about what the roles of specific pages and buttons were. I think this helped me learn to frontload the development process with a lot of discussion, planning, and delegating so that each team member knows their responsibility and feels confident building a portion that can fit into the larger product. 
3. What do you wish I could have done differently?
As you started to mention in class, I think that it would have been helpful for this class to collaborate with others outside of our department. I have been in classes in the past that have collaborated between Child Development and Mechanical Engineering, and the products were actually used in the classroom. Many of my friends are in other majors, and expressed desire and needs for apps, and creative ideas that I had never thought of. 
4. If you were to do this all over again, what would you do differently?
I wish that we had started earlier. I think we made consistent progress throughout the semester, but we definitely had bigger goals that we are just unable to reach because of all of our other work and tough bugs. 
5. If you could make one change to this Mobile Development course, what would it be and why?
I think another helpful change would be to pair groups with similar apps together so that they can share resources and support. During the workdays in class, you could set aside like 15 minutes to review and share information. 

#### Johnny’s Response:
1. What did you learn technically?
I learned a lot about React Native and the development process in it. I had never used React Native before, so it was exciting to be able to apply the knowledge of web apis that I already had to try and apply it to our mobile development.
2. What did you learn professionally? Please note: this is not the same as the above question.
Although I had had experience in developing web apis, this project gave me a lot of experience in determining the style of data returned. Working on a team of three, it was nice to have a separation of powers and then working together to make all of our separate pieces. It was nice because we were able to support each other when necessary so we all had knowledge on the many moving parts, but each of us had a specialty in one area.

3. What do you wish I could have done differently?
I think with the breadth of material to cover, you did a very good job (I assume this is towards Ming as an instructor(?)) I think perhaps organizing teams so that people with different capabilities could come together. Perhaps you could create a google poll that asks people to list their strengths and desired paths to learn, and then grouped teams like that. For example, matching someone who’s done web development with someone who’s taken OOP GUI.

4. If you were to do this all over again, what would you do differently?
If I were to do this all over, I think I would try to keep the scale of our project smaller and try to work on it in increments at a time so that we would have been able to detect issues earlier and address them instead of feeling the pressure to finish all of the features we had in mind.

5. If you could make one change to this Mobile Development course, what would it be and why?
I think I would set up the lightning talks so that in addition to the speaking portion, each team would create an independent module or code snippet and add it to their public Github so that if someone goes up to present and you find it very interesting, you would be able to go straight to their source code location and use it rather than trying to go and do all the learning to set it up on your own.





#### Sara’s Response: 
1. What did you learn technically?
I got experience using React Native, which I had never used before. This also gave me some insight into React in general because I’ve only done minal work in React JS. This class also taught me about some basics of mobile development such as activities and intents, and the importance of responsive layouts that work well in both portrait and landscape mode.
2. What did you learn professionally? Please note: this is not the same as the above question.
Professionally, I learned about the importance of communication in group projects and developing with a small team. This experience taught me a lot about how to balance work among different developers to capitalize on individual strengths and to give each team member a chance to work in an area they want to learn more about. We also learned to step up and be mindful of everyone’s capacity, so that if one teammate had a lot of work for other classes, the other two could temporarily take on more of the workload for our project, knowing that it would be reciprocated. 
3. What do you wish I could have done differently?
I think having the opportunity to collaborate with outside classes could make for some very interesting apps and more learning opportunities about working with teams. We talked in class about some collab options, and I think it would be cool to do a joint project between mobile dev and Human-Computer Interaction. In that class they prototype a mobile app and do usability testing, but they don’t actually code anything. I think combining forces to create a mobile app could be really cool and representational of the process of working with the UX team as a developer.
4. If you were to do this all over again, what would you do differently?
If I could do this again I would cut our plans down to fewer features so we could focus on getting a polished MVP with an intentionally designed UI before trying to add more functionality. We underestimated how much effort it would take to implement some of our ideas. I think they were good ideas for user retention and usability, but they would have to come later. I also might consider doing the project in Android Studio. As you mentioned at the beginning of the semester, the drawback to React is that you simply don’t know what’s going on under the hood. This proved to be a minimal problem for most of the semester, but with the blank screen apk bug we’re encountering, it’s hard to know where to start because we don’t know exactly what’s going wrong. Crashlytics isn’t so helpful for us because it doesn’t officially support React Native, so I think there could be some benefits to using Android Studio.
5. If you could make one change to this Mobile Development course, what would it be and why?
I think it would be nice to have the mvp due a little earlier in the semester, with an emphasis on the fact that it can be minimal, so that there’s more time to improve on it in the second half of the semester


