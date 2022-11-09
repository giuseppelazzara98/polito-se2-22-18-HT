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

