## KnowHow Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Installation
1. [Install docker compose](https://docs.docker.com/compose/install/)
2. Make sure you are in the project's root folder 
3. Run `docker-compose up` 

## Useful comands

In the project directory, you can run:

### `docker-compose up`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`docker-compose up --build` will recreate the image for you.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `docker-compose run app yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Assumptions & tradeoffs

Assumptions:

Tradeoffs:
- At first I implement pagination in the tradition way, however the user experience was not the best. 
  So I implemented an "infinite scroll" and added a "go to top button" on the button right.
- I remove the "Search for GIFs" button is more natural to press just enter.
- I added a "Trending" link at the right of the search bar just to simulate a "home".
- I slighty change the gif component, so the title, user, heart icon and share icon will show on hover.
