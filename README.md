# Pictionary

This is a React Native application for the popular charades-inspired [board game](https://en.wikipedia.org/wiki/Pictionary).  There's no board and no die, each player gets has to make his/her teammates correctly guess the word presented by the application. 

## Preview

### Screens
![Pictionary Screen 1](https://imgur.com/XdMIskY.png "Screen 1")![Pictionary Screen 2](https://imgur.com/YILW0mC.png "Screen 2")
![Pictionary Screen 3](https://imgur.com/PRTyA6m.png "Screen 3")

### Demo
![Demo 1](https://imgur.com/1LsSixG.gif "Demo 1")
![Demo 2](https://i.imgur.com/XTmIq1R.gif "Demo 2")

___

## Features
- **Redux** for application-level state management
- **Firebase Database** is used to store the bank of available words
- Uses a simple **regression** model to present the words to the player. Each player's performance is tracked using the Redux store
- **Firebase Functions** for serverless, compute-intense backend code. The logic for the regression model is implemented in a cloud function
- Tinder-like swipe deck of word cards, implemented using the `Animated` and `PanResponder` modules in React Native

## Getting Started
### Prerequisites
Install all the required modules using,
```bash
 $ npm install
```
### Running the application
To run the application, create an account at [Expo](https://expo.io/signup) and download the Expo Client ([iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)). Then run
```bash
 $ npm start
```
This will run a local server that will host your app. You can now navigate to your app in the Expo Client on your device.

## Built With
- [React Native](https://facebook.github.io/react-native/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [React Native Router Flux](https://github.com/aksonov/react-native-router-flux)
- [React Native Elements](https://react-native-training.github.io/react-native-elements/)


