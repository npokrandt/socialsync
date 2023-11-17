# Socialsync

## Description

We are all busy people, and with hectic lives. Planning get-togethers with friends can be nigh impossible! Socialsync is a social media that allows you to easily schedule events and compare them with those of your friends, and connect better!

## Technologies

Socialsync is a full-stack application, based on the MERN stack. The back-end is a mongoDB database utilizing apollo and graphql for routing, react on the front end, and node keeping it all together.

## Usage 

The user enters to see the homepage, which basically explains the site, along with providing buttons linking to the login or sign-up page. These can also be accessed from the header. 

The signup page is pretty simple. The user enters a username, an email address, and a password. Upon creating the account the user is logged in and directed to the profile page. Login is similar, requiring the email and password, and directing to the profile page upon success. 

The profile page is hidden unless the user is logged in. It shows their profile picture, with a calendar beneath. The calendar is where the user can create, modify, or delete events. To create an event, the user clicks somewhere on the calendar. They will be prompted for an event title and start and end time. Once those are provided, the event is added to the calendar. Events on the calendar can be modified or deleted. To modify the event, click the event, then the pencil icon. The prompt will show the current info and the user changes what he needs to. To delete an event, click the trash can. The user will confirm that they want to delete the event.

The friends page shows all the user's friends. Beneath that list is a selection of users they could add as friends. They do that by clicking the button next to the username. Each of their friends can be clicked on and taken to their profile page. This shows the friend's info and a list of their events, with an option to add them to their own calendar. To do this, you click on the button next to the event.

That's it, for now! Happy scheduling!

Profile page:
![profile page](/READMEimages/profilePage.png)

Friends page:
![friends page](/READMEimages/friendsPage.png)

## Link

Check out Socialsync here:
https://socialsync-122645211db0.herokuapp.com/

## Notes

A lot of this, especially involving graphql, was helped by looking at previous assignments, and some of the tough work an instructor helped with. Aside from that the code is our own