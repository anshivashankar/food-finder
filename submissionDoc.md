# Project Submission Document
## Food Finder

## Meta
* Who was on your team?

Catalina (Catu) Berretta, Tina Noorani, Ashwin ShivaShankar,
and James Wu

* What's the URL of your deployed app?

https://food.shivashankar.net/

* What's the URL of your github repository for your  app?

https://github.com/anshivashankar/food-finder

* Is your app deployed and working?

Yes.

* For each team member, what work did that person do on the project?
### Catalina
- Rating System
	- Filtering of Ratings via Restaurant Profile / User Profile
- Profile of User
- Friends List Front-End implementation
### Tina
- Login and Registration
- Rendering Restaurant Lists on Main Page
- Rendering of Restaurant Profiles
	- Ratings CRUD
### Ashwin 
- Fetching and displaying restaurants
- Chat system
- Deployment
### James
- Fetching restaurants
- Setup on backend for Google API for deployment
- Friends list

## App
* What does your final app do?

Fetches and displays restaurants around the user.
Displays information and ratings about a restaurant.
Provides a friends list and chat client.
All of this can be done on mobile phones.

* How do users interact with your application?

Users can find restaurants around them.
They can chat with friends over the app.

* What can they accomplish by doing so?

They can rate restaurants they like, promoting said restaurant.
They can talk with friends about restaurants through the app.

* How does your final app differ from what was described?

The app is largely the same.
Some features were cut, including:
	- Preferences
	- Ride sharing integration
* How well did you execute your app idea?

Very well. The app looks like what we imagined.
The cut features were not major parts of the app, and the
features are largely the same.

* For each project requirement above, how does your app meet that?

Our project is very ambitious. It seeks to make an all-in-one app:
 - Find nearby restaurants
 - See details about the restaurant
 - See user reviews about the restaurants
 - Chat with friends, and make plans
Our server side logic is in Elixir / Phoenix.
Our application has significant server-side logic:
 - Location fetching and parsing happens server side.
 - All chat messages are stored in our database.
 - Restaurant ratings are handled through our server.
Our app is deployed to Ashwin's VPS.
We do not have any assets from CDNs.
Our app has user accounts and stores them locally.
Users, Ratings, and Chats are stored in a PostGres database.
Our app uses the Google Location API.
Our Location API is used server side.
Our app users Phoenix Channels for our chat system.
	- Client messages are sent to the server which broadcast
	- to the receiver in real-time.
We have worked with a 4 person team and all have contributed.

* What interesting stuff does your app include?

We included different pages for each restaurant,
and compiled reviews for each user on thier profile.

* What's the complex part of your app?

One complex feature is the chat system, where we had to figure
out how to create different channels for each set of users.
We solved this through a URL that uses a different channel
for each unique set of chat-ers.
A user who is not one of the two chat-ers is not able to send
messages due to authentication requirements.

* What was the most significant challenge?

We believe our most significant challenge was figuring out the proper way to pass data around. For example, not everything can be put into store. Extraneous data, such as tokens, can be stored in local storage and cookies, which we utilized to its full extent in this app.
