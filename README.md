# TFT-Match-History

A backend service that allows you to get various match and summoner statistics for TeamFightTactics.

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

### Modularization

The code was seperated into different modules to make for readability, and efficiency.

### Testing

Unit tests were written for all necessarry functions using Jest.
* Coverage
    * Both modules with testing have over 85% coverage.
    * The coverage report can be accessed via /coverage/lcov-report/index.html

### Github Actions

Github actions were added to the project and will are set to run anytime a branch is pushed, or a Pull Request is put up.
* The action runs:
    * Test
    * Lint
    * Prettier

### EsLint

EsLint was added to analyze the code and quickly fix issues.

### Prettier

Prettier is used to go through and format the code automatically.