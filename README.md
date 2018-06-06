# Restaurant-mws-App

# Mobile Web Specialist Certification Course
---
## 2 Stage MWS

Now, in this stage we are using the fetch data from server api, in this stage I must be to use Service Worker and IndexedDB to cache data and optimize the project to satisfy the requirement when running lighthouse in chrome

- Progressive Web App: > 90.
- Performance: > 70.
- Accessibility: > 90.


For run the project is mandatory follow the next instructions.

## Instructions run server API
For run this app, you will download the server api from [here](https://github.com/udacity/mws-restaurant-stage-2).
way to the path to run the commands to below:

###### Install project dependancies
```
# npm i
```

###### Start the server
```
# node server
```

### Usage

#### Get Restaurants
```
curl "http://localhost:1337/restaurants"
```
#### Get Restaurants by id
````
curl "http://localhost:1337/restaurants/{3}"
````

## Instructions run APP


### For start the project:

###### Install project dependancies
```
# npm i
```

###### Star the project APP
```
# gulp minify-files // for minify-files and create the responsive images
# gulp serve:dist // for run the project
```

## Automaticaly open your default browser on localhost:8000, where you can view and navigate for the restaurant App.