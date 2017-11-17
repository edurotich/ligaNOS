# Liga NOS ⚽

An Angular app that consumes from [footbal-data](http://www.football-data.org/index) free API and displays content related to Portuguese Football League:
* Match scores for each journey
* Head to head statistics
* Current league table with each team progress and league statistics
* League calendar with all season matches
* List of league teams
* Team Squads

## Screenshots

| ![Home](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/home.png)  | ![Headtohead](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/headtohead.png) | ![Leaguetable](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/leaguetable.png) |
|-|-|-|
| ![Calendar](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/calendar.png) | ![Leaguestats](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/leaguestats.png) | ![Teams](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/teams.png) |
| ![Teamsquad](https://github.com/miguelsaferreira/LigaNOS/blob/master/src/assets/images/teamsquad.png) |


## Getting started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### Prerequisites

* You will need to install Cross-Origin Resource Sharing (CORS) plugin since there is no backend server running in order to enable it. I use [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)
* An API key from [footbal-data](http://www.football-data.org/) or you can run this project locally by setting localjson to true in the environment.ts file.

### Installing

```
Run npm install to tnstall the dependencies in the local node_modules folder
```

```
Setup your enviroment.ts file:
- authToken: 'yourAPIKey'
- api_url: ' 'http://api.football-data.org/v1/'
- localjson: boolean  // false => use API | true => test with local json
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Built with
* [Angular](https://github.com/angular/angular) - Frontend MVC framework
* [Bootswatch](https://github.com/thomaspark/bootswatch) - Bootstrap free themes
* [angular-calendar](https://github.com/mattlewis92/angular-calendar) - Calendar for Angular 4.0+


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Author
Miguel Ferreira [@miguelsaferreira](https://github.com/miguelsaferreira)
