# Recom-Eats #

An AI powered food recommendation website built to solve a problem that I was having, too much different ingredients in the pantry and not knowing what to do with them. Throught my problem solving process I had the idea that it could be a pretty nifty project if I did it correctly and so I went to town and made what you see here.


## The Home Page ##

![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/1056017c-1152-4895-bb5e-325e2f54089c)

For the home page, I wanted to communicate a sense of comfort and homeliness and so chose a colour palette leading towards that. You'll notice the lady with the psetle and mortar as the center piece. This was a very deliberate decision designed to push the idea that anyone could use this to achieve whatever dish it is they desire. In the tech side of things I will say a few things about my thought process for this particular page, throughout the rest of this README, I will try to do similar things for the sections coming afterwards.

  - For one I wanted to make sure there was a visible gradient in the top image area, that didn't overtake the text and allowed for the text to really pop. This was done via a rather involved background line ``` background: linear-gradient(0deg, rgba(147, 120,     91, 0.2), rgba(147, 120, 91, 0.8)), url('/images/1.jpg'); ```. I came to the conclusion of this being neccessary after experimenting with putting filters on a background-image declaration and having problems gaining the desired functionality.

  - The testimonials section was done with a react component reused with different information arranged with display flex. I spent some time experimenting with potentially using grid with css queries to change the desired amount of testimonials per line          dependent on on screen size but then decided on what is seen.

### Registration ###

![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/d2f7338a-46ac-4d3b-8682-fd2e74200ac4)

The registration modal as part of the home page kept the same theme as the home page as a whole. Accessing the registration window is as easy as clicking on sign in up at the top to open the login modal and then from there clicking on the register button as shown here:
![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/91cbcee1-cee8-4323-a88b-d168fbf60d97)
**Both the login and register modals make use of the same authentication functionality, where a jwtAuth token is generated, stored in localstorage and then used as authentication for all other api calls to the backend specific to that user throughout the duration of the user's stay on the webapp.**

### The Main Page ###
![cuisinenrecipes](https://github.com/Anthony-McDonald/recomeats/assets/89093671/116bbe43-dc6c-4e76-b83f-45d867a8988a)

Once a user has successfully logged in, they are greeted with the page shown above! Here users can access either their profile where they may select their preferred cuisine types, their recipe list and the FAQ (which won't be shown as part of this demonstration as it is mostly there as filler information but feel free to check it out [if you are so inclined!](http://13.60.10.44/)). You will notice that neither of these pages are particularly filled, this is because they were built simply for the use case of the current program, if this was to go to production, I would most likely brainstorm further functionality to justify the excess space usage.

## The Ai itself ##
![ai-recipes-add](https://github.com/Anthony-McDonald/recomeats/assets/89093671/291286e6-74e1-43d7-8d2c-6f94c0c72ebb)

In terms of the AI usage itself, it is accessed at a click of a button from the recipes page. This takes you onto a new webpage where you can remove and add the desired ingredients you want to look for in your recipes. After this you click generate recipes and a list of recipes are generated using the ChatGPT api (note: waiting has been cut for the purposes of this demonstration image, in actual usage wait times can be 10+ seconds in certain cases due to the time taken for the api to deliver a response). Once recipes are listed, users can click add to add recipes of their liking to their personal recipe list, which they can then re-access through clicking back to recipes.

## CRUD ## 
![crud](https://github.com/Anthony-McDonald/recomeats/assets/89093671/8727fd22-9926-4cb3-abbc-99f41a726bbd)

This then opens up to the CRUD portion of the program. Other than the automatic recipe creation shown above, users can also manually add recipes, edit existing recipe information, delete recipes, with instant updating of the information allowing for easy access to visually see the information entered. Should more than one recipe be present, buttons will appear on the top right hand side of the page to switch between pages of recipes also (again if you are interested in seeing it yourself, [give it a go]((http://13.60.10.44/)).

### The Back End ###

In the backend, this program runs on an Amazon Web Services EC2 instance with a PostgreSQL database allowing for 24/7 access through either of the links provided below:
  - [http://13.60.10.44/](http://13.60.10.44/)
  - [http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com/](http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com/)

If you have any further questions or queries, feel free to message me on the details on my GitHub home page, I'd be happy to communicate and gush some more about what I went through during the creation of this project.



