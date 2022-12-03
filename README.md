# polito-se2-22-18_HT - HIKE TRACKER PROJECT

Sofware engineering 2 a.a. 2022 / 2023

Developers: Gerardo Braia, Elisa Calì, Francesco Carpegna, Ahmed Khater, Giuseppe Lazzara, Francesco Rosati.

## TECHNOLOGIES USED:  

- **Front-end**: React, SASS;  
- **Back-end**: nodejs, SQLite, Knex; 
- **Maps**: OpenStreetMap;  

## HOW TO RUN THE HIKE TRACKER APPLICATION:

- Into the server folder: 
    - `npm install`  
    - `node server.js / nodemon server.js`
- Into the client folder:
    - `npm install`
    - `npm start`

## HOW TO RUN THE TESTS:

- Into the server folder:  
    - `npm test` -> Unit tests
    - `npm run apiTest` -> Integration tests

- Current test coverage file: `server/unitTestResult.txt`
- Current front-end test reports: `client/tests.md`

## REACT CLIENT APPLICATION ROUTES:

- Route `/`: the route contains the Home component. Here the user can see if not logged in, the complete list of hikes with the related filters and can create if logged in as a local guide, new hikes.
- Route `/login`: the route contains the login form, where the user can authenticate himself inserting username and password.
- Route `/signup`: the route contains the register form, where the user can register himself inserting name, surname, email, password and the role for which he / she wants to register for.
- Route `/newHike`: the route contains the form to create a new hike, where the local guide can insert all the useful informations related to the hike, including the GPX file.
- Route `*`:  the route displays an error message if a known route is not found or the current route is wrong. 

## API SERVER:

### Login:

__URL:__ `/api/sessions`  
__Method:__ POST  
__Description:__ Performs the login of the user.  
__Request body:__ 
```
{
    "username":"guide1@gmail.com",
    "password":"password"
}
```
__Response:__ `200 Ok`  
__Response body:__ 
```
{
    "id": 1,
    "username": "guide1@gmail.com",
    "name": "Paolo",
    "surname": "Bitta",
    "role": "Local guide"
}
```
__Error responses:__ `401 Unauthorized`

### Get current user informations:

__URL:__ `/api/sessions/current`  
__Method:__ GET  
__Description:__ Retrieves the informations of the current user.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
{
    "id": 1,
    "username": "guide1@gmail.com",
    "name": "Paolo",
    "surname": "Bitta",
    "role": "Local guide"
}
```
__Error responses:__ `401 Unauthorized`

### Logout:

__URL:__ `/api/sessions/current`  
__Method:__ DELETE  
__Description:__ Performs the logout of the current user  
__Request body:__ _None_  
__Response:__ `200 Ok`  
__Response body:__ _None_

### Get all roles:

__URL:__ `/api/roles`  
__Method:__ GET  
__Description:__ Retrieves the list of all the roles.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
[
    {
        "id": 1,
        "role": "Local guide"
    },
    {
        "id": 2,
        "role": "Hiker"
    }, ...
]
```
__Error responses:__ `500 Internal Server Error`

### User registration:

__URL:__ `/api/newUser`  
__Method:__ POST  
__Description:__ Creates an account for a new user with a specific role sending also an email to verify the account.  
__Request body:__ 
```
{
    "email": "hiker2@gmail.com", 
    "name": "Francesco",
    "surname": "Verdi",
    "password": "password",
    "id_role": 1
}
```
__Response:__ `201 Created`  
__Response body:__ 
```
{
    "id": 1,
    "username": "guide1@gmail.com",
    "name": "Paolo",
    "surname": "Bitta",
    "role": "Local guide"
} 
```
__Error responses:__ `409 Conflict`, `422 Unprocessable Entity`, `503 Service Unavailable`

### User email verification:

__URL:__ `/api/verify/:token`  
__Method:__ PUT  
__Description:__ Verifies the token sent by email to the user and activates the account.     
__Request body:__ _None_   
__Response:__ `200 Ok`  
__Response body:__ _None_
__Error responses:__ `401 Unauthorized`, `422 Unprocessable Entity`, `503 Service Unavailable`

### Get place by place id:

__URL:__ `/api/places/place/:placeId`  
__Method:__ GET  
__Description:__ Retrieves the informations of a place giving its id.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
{
    "id_place": 2,
    "name": "Parking lot 2",
    "description": "parking lot 2",
    "latitude": 25.037,
    "longitude": 34.522,
    "type": "parking lot"
}
```
__Error responses:__ `404 Not Found`, `422 Unprocessable Entity`, `500 Internal Server Error`

### Get place by province id:

__URL:__ `/api/places/:provinceId`  
__Method:__ GET  
__Description:__ Retrieves the list of all the places associated to a specific province id.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
[ 
    {
        "id_place": 9,
        "name": "Almici",
        "description": "...",
        "latitude": 37.2114,
        "longitude": 75.25,
        "type": "hut"
    },
    {
        "id_place": 16,
        "name": "Morgantini ",
        "description": "...",
        "latitude": 15.347,
        "longitude": 38.142,
        "type": "hut"
    }, ...
]
```
__Error responses:__ `500 Internal Server Error`

### Get all provinces:

__URL:__ `/api/provinces`  
__Method:__ GET  
__Description:__ Retrieves the list of all the provinces.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
[ 
    {
        "id_province": 1,
        "name": "TORINO",
        "abbreviation": "TO"
    },
    {
        "id_province": 2,
        "name": "VERCELLI",
        "abbreviation": "VC"
    }, ...
]
```
__Error responses:__ `500 Internal Server Error`

### Get the list of all hikes (optionally filtered):

__URL:__ `/api/hikes`  
__Method:__ POST  
__Description:__ Retrieves the list of all the filtered hikes.   
__Request body:__ 
```
{
	"province": 1,
	"difficulty": [1,2],
	"exp_time": { "min": 5.6, "max": 9.0 },
	"length": { "min": 0.0, "max": 15.7 },
	"ascent": { "min": 500, "max": 2900 }
}
```
__Response:__ `200 Ok`  
__Response body:__ 
```
{
    "hikes": [
        {
            "name": "Il Monte Cervia",
            "key": 1,
            "description": "...",
            "start_place": "Parking lot 1",
            "end_place": "Parking lot 2",
            "province": "TORINO",
            "length": 12,
            "expected_time": 6.5,
            "ascent": 1500,
            "difficulty": 1
        }, ...
    ],
    "distinct_ascents": [
        1500,
        2000,
        2500,
        1000,
        500,
        1800,
        2200,
        1450,
        123,
        78
    ]
}
``` 
__Error responses:__ `422 Unprocessable Entity`, `500 Internal Server Error`

### Create a new hike (only if the user is a local guide and is logged in):

__URL:__ `/api/newHike`  
__Method:__ POST  
__Description:__ Create a new hike.   
__Request body:__ 
```
{
  title: "Test1",
  province: 4,
  length: 4,
  expectedTimeString: "56m",
  expectedTime: 0.93,
  ascent: 1406,
  difficulty: 1,
  startPoint: {
    type: "Hut/Parking lot",
    id: 8,
    name: "Alevè",
    lon: 21.244,
    lat: 3.325
  },
  endPoint: {
    type: "Hut/Parking lot",
    id: 12,
    name: "Monte d'Oro",
    lon: 8.474,
    lat: 21.2475
  },
  referencePoints: [
    {
      id: 15,
      name: "Monte Talm",
      description: "...",
      lat: 18.364,
      lon: 13.412,
      type: "hut"
    },
    {
      type: "Address/Name of location",
      id: 298324244,
      name: "Politecnico di Torino, Corso Francesco Ferrucci, Cenisia, Circoscrizione 3, Torino, Piemonte, 10138, Italia",
      lat: 45.063697399999995,
      lon: 7.657527285508495
    }
  ],
  gpxData: '[...]',
  description: "Test1"
}
```
__Response:__ `201 Created`  
__Response body:__ _None_  
__Error responses:__ `401 Unauthorized`, `404 Not Found`, `422 Unprocessable Entity`, `503 Service Unavailable`

### Get hike points by hike id:

__URL:__ `api/hikePoints/:id`  
__Method:__ GET  
__Description:__ Retrieves the detailed list of all points related to a specific hike.  
__Request body:__ _None_  
__Response:__ `200 OK`  
__Response body:__ 
```
{
    "hikePoints": [
        {
            "id_place": 1,
            "name": "Parking lot 1",
            "description": "...",
            "latitude": 20.811,
            "longitude": 14.32,
            "startPoint": true,
            "endPoint": false,
            "type": "parking lot"
        },
        {
            "id_place": 2,
            "name": "Parking lot 2",
            "description": "...",
            "latitude": 25.037,
            "longitude": 34.522,
            "startPoint": false,
            "endPoint": true,
            "type": "parking lot"
        },
        {
            "id_place": 7,
            "name": "Alpe Bondolo",
            "description": "...",
            "latitude": 33.25,
            "longitude": 12.724,
            "startPoint": false,
            "endPoint": false,
            "type": "hut"
        }
    ],
    "gpx": [...]
}
```
__Error responses:__ `401 Unauthorized`, `404 Not Found`, `422 Unprocessable Entity`, `500 Internal Server Error`

## DATABASE TABLES:

- Table `HIKE`: contains the hikes informations, including name, description, province, difficulty, expected time, length, ascent, GPX file, local guide, start place and end place.
- Table `HIKE_PLACE`: contains informations related to the association between an hike and one or more places. (A place associated to an hike can be the start point, the end point or a reference point for that hike).
- Table `PLACE`: contains the places informations, including name, description, province, latitude, longitude and type.
- Table `PREFERENCE`: contains the informations related to the association between an user and his / her preferences.
- Table `PROVINCE`: contains the provinces informations, including name and abbreviation.
- Table `ROLE`: contains the roles informations, including the description.
- Table `USER`: contains the users informations, including name, surname, role, email and password.

## USER CREDENTIALS:

| Name | Surname | Username | Password | Role |
| :--: | :-----: | :------: | :------: | :---------: |
| Paolo | Bitta | `guide1@gmail.com` | `password` | Local guide |
| Giuseppe | Peppini | `guide2@gmail.com` | `password` | Local guide |
| Luca | Nervi | `hiker1@gmail.com` | `password` | Hiker |
| Francesco | Verdi | `hiker2@gmail.com` | `password` | Hiker |