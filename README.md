# TFT Match History

A backend service that allows you to get various match and summoner statistics for TeamFight Tactics.

## What is TeamFight Tactics?

![Logo of TFT](/images/logo-hero.png)

TeamFight Tactics is a strategy game developed by Riot Games. In Teamfight Tactics, you’re going up against seven other players who are all assembling a team of champions across multiple rounds. It is considered an 'autobattler' game, because instead of controlling the champions, they fight automatically. The placement and type of champions you have on the board is part of the strategy and key to winning each round.

Each round is against one other player and their champions. If you win a round against another player, you’ll do damage to their health. The amount of damage you do depends on how many of your champions are still alive. To win the game you must be the last person left with health.
    
    https://teamfighttactics.leagueoflegends.com/en-us/

## Purpose of the Project

The purpose of this project is to be able to showcase the level of knowledge for the various languages and tech stacks I have learned. 

## Tech Stack

* JavaScript
* Node/js
* Express
* Swagger
* Axios
* Jest
* Prettier
* EsLint

## Code

### Modules

The code was separated into different modules to make for readability, and efficiency. As a developer, I want to make it as easy as possible for anyone else who is using this or future projects to be able to read and understand the project. Separating the code into simple modules allowed me to do that. It also allowed me to create capable and productive code.

### Testing

This project allowed me to do a ton of learning as I went through it. I wrote the code first and then followed by learning Jest for the unit tests.
Unit tests were written for all necessary functions using Jest.
For the tests to properly go through the code and test correctly, I had to write many different mock functions. I also mocked Axios, so as to not make an actual HTTP request every time that I run the tests.
* Coverage
    * Both modules with testing have over 85% coverage.
    * The coverage report can be accessed via /coverage/lcov-report/index.html

### Github Actions

Github actions were added to the project to run anytime a branch is pushed, or a Pull Request is put up. The action is mainly responsible for making sure that nothing code breaking was added to the project. It also runs Lint and Prettier to make sure that everything is up to par.
* The action runs:
    * Test
    * Lint
    * Prettier

### EsLint

EsLint was added to analyze the code and quickly fix issues. EsLint made for easy analyzing, picking up unused variables and small mistakes throughout the project.

### Prettier

Prettier is used to go through and format the code automatically. Prettier was a very nice addition to the project because it allowed me to give a uniform presentation to small things that I may have previously missed.