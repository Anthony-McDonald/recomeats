# Recom-Eats #

An AI powered food recommendation website built to solve a problem that I was having, too much different ingredients in the pantry and not knowing what to do with them. Throught my problem solving process I had the idea that it could be a pretty nifty project if I did it correctly and so I went to town and made what you see here.


## The Home Page ##

![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/1056017c-1152-4895-bb5e-325e2f54089c)

For the home page, I wanted to communicate a sense of comfort and homeliness and so chose a colour palette leading towards that. You'll notice the lady with the psetle and mortar as the center piece. This was a very deliberate decision designed to push the idea that anyone could use this to achieve whatever dish it is they desire. In the tech side of things I will say a few things about my thought process for this particular page, throughout the rest of this README, I will try to do similar things for the sections coming afterwards.

  - For one I wanted to make sure there was a visible gradient in the top image area, that didn't overtake the text and allowed for the text to really pop. This was done via a rather involved background line ' background: linear-gradient(0deg, rgba(147, 120,     91, 0.2), rgba(147, 120, 91, 0.8)), url('/images/1.jpg');'. I came to the conclusion of this being neccessary after experimenting with putting filters on a background-image declaration and having problems gaining the desired functionality.

  - The testimonials section was done with a react component reused with different information arranged with display flex. I spent some time experimenting with potentially using grid with css queries to change the desired amount of testimonials per line          dependent on on screen size but then decided on what is seen.

### Registration ###

![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/d2f7338a-46ac-4d3b-8682-fd2e74200ac4)

The registration modal as part of the home page kept the same theme as the home page as a whole. Accessing the registration window is as easy as clicking on sign in up at the top to open the login modal and then from there clicking on the register button as shown here:
![](https://github.com/Anthony-McDonald/recomeats/assets/89093671/91cbcee1-cee8-4323-a88b-d168fbf60d97)
**Both the login and register modals make use of the same authentication functionality, where a jwtAuth token is generated, stored in localstorage and then used as authentication for all other api calls to the backend specific to that user throughout the duration of the user's stay on the webapp.**

