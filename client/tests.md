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
   1. if it it a checkbox it show if it is selected or not
   2. if it is a range filter, its extremities show the range choosen by the user
3. The list of the hikes is updated according to filters selected

#### Expected result

Point 3 is true

### Test 2 - filter functionalities mobile

#### Procedure

1. Open filters modal by clicking on the `filter button`
2. Select one or more filters
3. The filter change state:
   1. if it it a checkbox it show if it is selected or not
   2. if it is a range filter, its extremities show the range choosen by the user
4. Close the modal clicking on the `close button`
5. The list of the hikes is updated according to filters selected

#### Expected result

Point 5 is true

### Test 3 - open the description of an hike

#### Procedure

1. On the hike line , press the ↓ button
2. It will apper a table with the data about the hike
3. To close the table, press ↑ button

#### Expected result

Point 2 is true

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

### Test 2 - add a new hike

#### Procedure

1. write a name for the hike in the title
2. Select a province for the hike in the drop down menu
3. Insert a length , an expected time and the ascent of the hike using integers
4. Select a difficulty by click the round button near the level of difficulty,it will change colour
5. Select a starting point in the drop down menu
6. Select an ending point in the dropdown menu
7. Add reference points selecting them from a database
8. Insert a description for the hike in the description form
9. Press submit to insert the hike in the database
10. The hike is showed in the hike tables(depending on the activated filters)

#### Expected result

Point 10 is true
