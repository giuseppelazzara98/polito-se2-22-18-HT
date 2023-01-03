# Test fe - description

This is a document of test for the ui parte ofe the application

## Story 1 - Browse Hikes

```
As a visitor \
I want to see the list (with filtering) of available hikes \
So that I can get information on them
```

### Test 1 - filter functionalities desktop

#### Procedure

1. On the filter section select one or more filters
2. The filter change state:
   1. if it is a checkbox it show if it is selected or not
   2. if it is a range filter, its extremities show the range choosen by the user
   3. if it is a select it show the selected value
   4. in the map you can select a point and a radius from that point
3. The list of the hikes is updated according to filters selected

#### Expected result

Point 3 is true

### Test 2 - filter functionalities mobile

#### Procedure

1. Open filters modal by clicking on the `filter button`
2. Select one or more filters
3. The filter change state:
   1. if it is a checkbox it show if it is selected or not
   2. if it is a range filter, its extremities show the range choosen by the user
   3. if it is a select it show the selected value
   4. in the map you can select a point and a radius from that point
4. Close the modal clicking on the `close button`
5. The list of the hikes is updated according to filters selected

#### Expected result

Point 5 is true

### Test 3 - open the description of an hike

#### Procedure

1. On the hike line , press the i button
2. It will apper a table with the data about the hike
3. if the user want to see a bigger version of the foto for the hike,he can click on the photo with the mouse, and the photo will zoom
4. To close the table, press i button

#### Expected result

Point 2 is true

### Test 4 - changes order of the hike

#### Procedure

1. In the upper right corner,go to the green button with the writes Order by
2. Press it
3. It will open a drop down menu were the user can choose to order by diffivulty or province, in a ascending or a descending way
4. the list of the hikes cahngfe according to the selected criterion

#### Expected result

Point 4 is true

## Story 2 - Describe Hikes

```
As a local guide \
I want to add a hike description \
So that users can look at it
```

### Test 1 - go to login page

#### Procedure

1. In the right corner of the screen, push the login button
2. It appear a new page with a login form

#### Expected result

Point 2 is true

### Test 2 - login

#### Procedure

1. Insert email and password
2. Press the Login button
3. It will redirect to the hikews table page,logged in with the role of the user
4. The name of the user will appear in the upper right corner,and a modal with a welcom message will appear in front of the user

#### Expected result

Point 3 and 4 are true

### Test 3 - add a new hike

#### Procedure

1. Write a name for the hike in the title(between 4 and 30 characters long)
2. Select a province for the hike in the drop down menu. It will unlock the two drop down menu for the start and end point
3. Add the expected time for the hike,(h for hours, m for minutes) .The max value is 23 hours and 59 minutes
4. Select a difficulty by click the round button near the level of difficulty,it will change colour
5. Upload a gpx file of the hike you want to add
6. It will apper the lenght of the hike, his ascent and the map with the track.
7. Select a starting point and a end point  in the drop down menu
8. select a photo for the hike,It will appear in the description
9. (optional)Select a tipe of the reference point, it will appear a dop down menu with the select points. If the guide has selected
10. (optional)Insert a description for the hike in the description form the gpx coordinates, he need to add the longitude and latitude of the point.
11. Press the button Add reference point
12. The new reference point will appear in the form
13. (optional) add a description in the text form
14. Press submit to insert the hike in the database.If there are some errors in the forms, the error message will appear under the wrong field
15. The hike is showed in the hike tables(depending on the activated filters)

#### Expected result

Point 15 is true

### Test 4 - logout

#### Procedure

1. In the navbar, pass over the user name(or user icon for the mobile version) in the right corner
2. Select the log out button
3. Press the log out button
4. It will show a modal with a log out success message
5. It will redirect to the hikes table page, and the user will be considered as a visitor

#### Expected result

Point 5 is true

## Story 3 - Register

```
As a visitor \
I want to register to the platform \
So that I can use its advanced services
```

### Test 1 - go to sign up page

#### Procedure

1. In the navbar,press the Signup button in the upper right corner(the user icon for the mobile version )
2. It appear a new page with a sign up form

### Test 2 - sign up

#### Procedure

1. Fill all the fields :
   1. Insert name and surname.They can be the same betweeen users(homonym),but can't be empty
   2. select a role in the drop down menu
   3. choose a password that has a number of letter betweeen 8 and 30
   4. confirm your password
   5. insert the user's email, unique betweeen users
2. Press the submit button
3. If something has gone wrong,it will apper the allert message under the wrong fiels
4. If the mail had been already used,it will appear an error message and the user can login in the bottom part or in the upper right corner of the page,by pressing the login button
5. If everything is correct, it will return to the main page
6. A modal will appear with the message that inform the user that an email was sent to confirm the registation(if the user try to login without the confirmation of the mail, it will appear an error message that remaind to check the email)
7. In the email, if you confirm the data, it will redirect to the login page were you can enter as a member with the role chose

#### Expected result

Point 7 is true

## Story 4 - See hikes' details

```
As a hiker \
I want to see the full list of hikes \
So that I can get information (including tracks) on them
```

### Test 1 - open the map

#### Procedure

1. the user need to be logged in as an hiker
2. it will appear a blue butoon with th icon of a map in the line of the hike
3. press it
4. it will open a modal form with the map for the specific hike

#### Expected result

Point 4 is true

### Test 2 - using the modal map

#### Procedure

1. the user can zoom in or zoom out the map with the + or  - button in the upper left corner of the modal
2. the user can move the map view by keeping pressed the mouse and movint the mouse
3. pressing with the mouse the reference points in the hike , the user can see the description of it
4. pressing the x button in the upper right corner, the modal map will close,returning to the hike table

#### Expected result

Point 3 is true

## Story 5 - Describe hut

```
As a local guide\
I want to insert a hut description
```

### Test 1 - go to the new hut page

#### Procedure

1. the user need to be logged in as a local guide
2. move the cursor over the user name in the right upper corner
3. it will appear a drop down menu with different options for the local guide
4. select new hut and press the mouse
5. it will  redirect to a new page with the form for adding a new hut

#### Expected result

Point 5 is true

### Test 2 - insert a new parking lot

#### Procedure

1. Fill all the fields in the form :
   1. Insert name of the hut. It can't be empty
   2. Insert the altitude. It can't be a negative number
   3. Insert the number of beds. It can't be a negative number
   4. Optionally, insert the URL of the website of the hut. It must be a http or an https site. An example of the site is under the insert field
   5. Insert an email
   6. Insert a phone number with the prefix before it. An example is unsder the insert
   7. insert a description of the hut
   8. In the map on the right, you can select a province by clicking on it
2. Press the submit button
3. If something has gone wrong,it will apper the allert message under the wrong fiels
4. If everything is correct in the form, the user will be redirected to the hike table page
5. It will appear a modal of success if the new hut is correctly saved in the db, an error modal if something went wrong

## Story 6 - Describe parking

```
As a local guide\
I want to add a parking lot
```

### Test 1 - go to the parking lot page

#### Procedure

1. the user need to be logged in as a local guide
2. move the cursor over the user name in the right upper corner
3. it will appear a drop down menu with different options for the local guide
4. select new parking lot and press the mouse
5. it will  redirect to a new page with the form for adding a new parking lot

#### Expected result

Point 5 is true

### Test 2 - insert a new parking lot

#### Procedure

1. Fill all the fields in the form :
   1. Insert name for the parking lot.It can't be empty
   2. Insert the capacity of the parking lot. It can't be a negative number
   3. Optionally, insert a description for the parking lot
   4. In the map on the right, you can select a province by clicking on it
2. Press the submit button
3. If something has gone wrong,it will apper the allert message under the wrong fiels
4. If everything is correct in the form, the user will be redirected to the hike table page
5. It will appear a modal of success if the parking lot is correctly saved in the db, an error modal if something went wrong

#### Expected result

Point 5 is true

## Story 17 - Start hike

```
As a hiker\
I want to start a registered hike\
So that i can record an ongoing hike
```

### Test 1 - register an hike

#### Procedure

1. the user need to be logged in as a hiker
2. on the main page of the hiker will appear a button with a plus simbol
3. by pressing the button, it will appear a modal that ask to confirm if the hiker want to register this specific hike to his personal hikes
4. by pressing cancel the modal disappear
5. by pressing register the specific hike will be added to hiker's personal hikes
6. a modal with the success message , or error message, will appear
7. the plus button disappear in the hikes already registered for the hiker

#### Expected result

Point 6 is true

### Test 2 - go to personal hikes

#### Procedure

1. the user need to be logged in as a hiker
2. on the navbar,by passing over the user name, will appear a drop down menu
3. select the my hike option
4. it will redirect to the personal page of the hiker, were the hiker can see his registered hikes with their status(not started,ongoing, caompleted),start and end time

Point 4 is true

### Test 3 - start an hike

#### Procedure

1. the user need to be logged in as a hiker
2. the hiker must had registerd the hike that he wants to start
3. by pressing the gear button, it will appear under the hike a form with date and time to select
4. the values are the ones of the moment the user refreshed the page
5. the user can change this values if he wants
6. by pressing the  end hike button on an ongoing hike, the form will disappear, the end time for the  hike in the table will be the one in the form,the state of the hike change to completed
7. if the user press again the button vith the gear, it will appear a nessage of congratulations

#### Expected result

Point 6 is true

## Story 18 - Terminate hike

```
As a hiker\
I want to terminate a hike\
So that the hike is added to my completed hikes
```


### Test 1 - terminate a hike

#### Procedure

1. the user need to be logged in as a hiker
2. the hiker must had registerd the hike that he wants to end
3. the hike must be already started
4. by pressing the gear button, it will appear under the hike a form with date and time to select
5. the values are the ones of the moment the user refreshed the page
6. the user can change this values if he wants
7. by pressing the start button on a not started hike, the form will disappear, the start time for the  in the table will be the one in the form,the state of the hike change in ongoing

#### Expected result

Point 6 is true
