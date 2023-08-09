## Introduction

This is a challenge made by Blue Prism where I have to create an application to manage schedules and their log entries.

## Tech Stack

For this challenge I decided to build the application initially using Vite.js, I have been using it for all of my personal projects and I really like this template, because it's smoother and does not have a lot of boilerplate.
As for the technologies used, I used React + Typescript, I used Styled Components for styling, React Query for managing and caching REST APIs, for testing I used Jest + React Testing Library, for mocking API calls I used MSW (Mock Service Worker), for API calls I used Axios and for components, icons, etc. I used React Icons and React Toastify.
I picked Styled components because I wanted to write CSS myself to showcase my knowledge and depth with it and also because I can pass props to components to manage dynamic styling.
I picked React Query because it is very robust and easy to use and it gives you all of the state you need from an API response, which is loading states, error, the data itself and so on, it makes it easy to handle errors, to handle success, to manage UI when the state is loading, etc... Also it makes your code clean because you don't have to create many states and useEffects to handle api calls and storing the data.

## Project guide

To run the project, run npm install or yarn to install all of the dependencies, once you have the dependencies installed, make sure you run the server to get the endpoints working.

Then run npm run dev to start the frontend server.

## Improvements

If I were to keep working on this project, I would definitely improve the following:
1- Create a Filter component that can be reused and customized, for this task itself it wasn't necessary to build anything fancy so I used a simple html input element where it was needed.
2- There is a MENU at the top right which doesn't do anything currently, however, my idea was to essentially turn that menu into a navigating menu, so you would click on the menu and a component would slide into the screen like a drawer containing all of the possible routes for the application, also the name of the page "Schedules" at the top left is hardcoded because there is no Routing in this application, otherwise it would be dynamic depending on which page you were on. Ps: I did a small animation with the menu which I think looks cool.
3- I would add validation to the forms in the application, since anything is accepted as payload for the endpoints, I made sure that the inputs are all required so that we have every information needed sent as payload. I know this isn't ideal but for this test I decided to leave it like that because of time purposes.
4- I would also create separate and reusable components for the form inputs
5- I did create PUT POST DELETE cases for Log Entries and Schedules, however, I didn't create a button to edit all of the information in a Schedule... So I would add the ability to do that as well.

## Enjoy playing around!

The project is 100% responsive and it has a couple of animations here and there. I hope you enjoy playing around with it as much as I enjoyed making it!