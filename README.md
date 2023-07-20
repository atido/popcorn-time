![logo POPCORN TIME](https://popcorn-time.fly.dev/images/logo.png)

# PROJECT | POPCORN TIME

## Introduction

The website was part of a project during my bootcamp training. The project was voted the best webapp of the promotion :star:
The project is a Film Search and Discovery Portal to Inspire Your Evenings.

## The app is online

The app is available [here](https://popcorn-time.fly.dev) and fully responsive on mobile, iPad or desktop.

## Technical stack

The project is based on the MVC architectural pattern and the controller is a on a 3 layers architecture :

<img src="https://popcorn-time.fly.dev/images/3tier-architecture.png" width="400" />

- Router / Controller receive : the top layer of the architecture. It receives user requests and returns appropriate responses. The controller is responsible for user interaction, input validation, and error handling.

- Service : This intermediate layer contains the business logic of the application. The service receives requests from the controller, performs necessary operations using the functionalities provided by repositories or external data sources APIs and then returns the results to the controller.

- Repository : the bottom layer of the architecture. It is responsible for data access. The repository communicates with the database or other external data sources to retrieve, store, or update the necessary data.

## Testing
The test coverage of the project is **complete** and implemented using Jest.

## CI / CD process
The build and deploy is automated with github actions and pushed to production environment hosted on fly.io.

## Movies data

All the data are free information from [TMDB database](https://www.themoviedb.org/?language=fr)

## Screenshots

### Non Authenticated User

<img src="https://mega-bomberman.netlify.app/images/screenshot-1player.png" width="300" />

### Authenticated User

<img src="https://mega-bomberman.netlify.app/images/screenshot-2players.png" width="300" />
