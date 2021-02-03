# __TFT Match History__

A backend service that allows you to get various match and summoner statistics for TeamFight Tactics.

## __What is TeamFight Tactics?__

![Logo of TFT](/images/readme/logo-hero.png)

[TeamFight Tactics](https://teamfighttactics.leagueoflegends.com/en-us/) is a strategy game developed by Riot Games. In Teamfight Tactics, you’re going up against seven other players who are all assembling a team of champions across multiple rounds. It is considered an 'autobattler' game, because instead of controlling the champions, they fight automatically. The placement and type of champions you have on the board is part of the strategy and key to winning each round.

Each round is against one other player and their champions. If you win a round against another player, you’ll do damage to their health. The amount of damage you do depends on how many of your champions are still alive. To win the game you must be the last person left with health.


## __Purpose of the Project__

The purpose of this project is to be able to showcase the level of knowledge for the various languages and tech stacks I have learned. This backend service allows anyone to type in their 'summoner name' and retrieve different statistics on themselves. From the information you receive you can also look up specific match information that is provided via the RIOT API. 

### __Riot API__

The Riot API allows developers to access the vast depth of data stored from Riot Games. An API Key is required from a developer account that is free to sign up for. Riot gives you so much data to work with. My job was not only to give an easy way to access the API, but to also return only the important information.  
</br>

### __Data Returned__ 
</br>

__Summoner Info__ </br>
Returns information about a specific summoner.

Name | Description
-----|------------
summonerName | Summoner name.
level | Summoner level associated with the summoner.
profileIconUrl | A URL that leads to the picture of the profile Icon.
puuid | Encrypted PUUID. Exact length of 78 characters. It is used to access match information, and can also be used to look up other summoners.
</br>

__Match List__ </br>
Returns an array of match id's used to get a specific match's info.

Name | Description
-----|------------
matchId | Id of a specific match.
</br>

__Match Info__ </br>
Returns information about a specific match, using a match ID.

Name | Description
-----|------------
summoner | Summoner name.
placement | The placement of the summoner.
level | Summoner level associated with the summoner.
playersEliminated | The number of players the summoner eliminated.
totalDamage | Total damage done to other players.
champions | Array of champion info.
</br>

## __Tech Stack__

* ![JavaScript logo](/images/readme/JavaScript-logo.png) [JavaScript](https://www.javascript.com/)
<br/>

* ![NodeJs logo](/images/readme/nodejs.png) [Nodejs](https://nodejs.dev/)
<br/>

* ![Nodemon logo](/images/readme/nodemon.png) [Nodemon](https://nodemon.io/)
<br/>

* ![Express logo](/images/readme/express-log.png) [Express](https://expressjs.com/)
<br/>

* ![Axios logo](/images/readme/axios-logo.png) [Axios](https://www.npmjs.com/package/axios)
<br/>

* ![Swagger logo](/images/readme/swagger-ui-logo.png) [Swagger](https://swagger.io/)
<br/>

* ![Jest logo](/images/readme/jestjs-logo.png) [Jest](https://jestjs.io/)
<br/>

* ![Prettier logo](/images/readme/Prettier-logo.png)[Prettier](https://prettier.io/)
<br/>

* ![EsLint logo](/images/readme/eslint-logo.png)[EsLint](https://eslint.org/)
<br/>

## __Code__

### __Modules__

The code was separated into different modules to make for readability, and efficiency. As a developer, I want to make it as easy as possible for anyone else who is using this or future projects to be able to read and understand the project. Separating the code into simple modules allowed me to do that. It also allowed me to create capable and productive code.

### __Testing__

This project allowed me to do a ton of learning as I went through it. I wrote the code first and then followed by learning Jest for the unit tests.
Unit tests were written for all necessary functions using Jest.
For the tests to properly go through the code and test correctly, I had to write many different mock functions. I also mocked Axios, so as to not make an actual HTTP request every time that I run the tests.
* Coverage
    * Both modules with testing have over 85% coverage.
    * The coverage report can be accessed via /coverage/lcov-report/index.html

### __Github Actions__

Github actions were added to the project to run anytime a branch is pushed, or a Pull Request is put up. The action is mainly responsible for making sure that nothing code breaking was added to the project. It also runs Lint and Prettier to make sure that everything is up to par.
* The action runs:
    * Test
    * Lint
    * Prettier

### __EsLint__

EsLint was added to analyze the code and quickly fix issues. EsLint made for easy analyzing, picking up unused variables and small mistakes throughout the project.

### __Prettier__

Prettier is used to go through and format the code automatically. Prettier was a very nice addition to the project because it allowed me to give a uniform presentation to small things that I may have previously missed.