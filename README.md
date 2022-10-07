# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running API Database
- The API Database is required to populate the App with the required JSON data
- API Database can be found on Github if needed (https://github.com/JCPenne/scheduler-api)
- Clone the Repo
- Install Dependencies

```sh
npm run start - (From root directory of the API Repo)
```


## Description

Interview Scheduler is a Single Page React App. Incorporating Storybook, Cypress and Jest for testing suites.
Users can select which day they would like to Book / Edit / Delete appointments using the appointment UI and see the changes reflected live.

## Dependencies
  -  "axios": "^0.27.2",
  -  "classnames": "^2.2.6",
  -  "normalize.css": "^8.0.1",
  -  "react": "^16.9.0",
  -  "react-dom": "^16.9.0",
  -  "react-scripts": "3.4.4",
  -  "yarn": "^1.22.19"
## Dev Dependencies
  -  "@babel/core": "^7.4.3",
  -  "@storybook/addon-actions": "^5.0.10",
  -  "@storybook/addon-backgrounds": "^5.0.10",
  -  "@storybook/addon-links": "^5.0.10",
  -  "@storybook/addons": "^5.0.10",
  -  "@storybook/react": "^5.0.10",
  -  "@testing-library/jest-dom": "^4.0.0",
  -  "@testing-library/react": "^8.0.7",
  -  "@testing-library/react-hooks": "^8.0.1",
  -  "react-test-renderer": "^16.14.0",
  -  "sass": "^1.53.0"

## Screenshots
### Landing Page
![Landing Page](./docs/Scheduler%20Landing%20Page.png)
### Booking an Interview
***
![Book Interview](./docs/Scheduler%20-%20Book%20Interview.png)
### Confirmation View
***
![Confirm Interview](./docs/Scheduler%20-%20Confirmation%20Component.png)
### Error View
***
![Error Example](./docs/Scheduler%20-%20Error%20Component.png)