# React Redux Starter Kit

## React Redux Starter Kit — [_isomorphic_](http://isomorphic.net/) web app boilerplate.
This is an opinionated boilerplate for web
development built on top of [Node.js](https://nodejs.org/),
[Express](http://expressjs.com/), [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/), containing modern web development
tools such as [Gulp](http://gulpjs.com/), [Babel](http://babeljs.io/), [Eslint](http://eslint.org/)
and [Browserify](http://browserify.org/). Helping you to stay productive
following the best practices.

## Getting Started

### Requirements
  * [Nmp](https://www.npmjs.com/) package + [Node.js](https://nodejs.org/) v6.* or newer




### Quick Start

#### Clone the project

```shell
$ git clone https://github.com/maxmarinich/react-redux-starter-kit.git

```
#### Set `gulp` global:

```bash
npm i -g gulp
```

### Run

```
npm i
```

```
npm start
```

### Test
```
npm run test
```
###### TODO

### Listening
* Open browser [`http://localhost:8080/`](http://localhost:8080/).

### The structure of project

```
├── source/
│   │                         
│   │    
│   ├── assets/                   
│   │   │  
│   │   ├── i/
│   │   │
│   │   ├── js/
│   │   │   │
│   │   │   ├── structure/     
│   │   │   ├── configureStore.js	      
│   │   │   ├── index.js     
│   │   │   ├── log.js	
│   │   │   └── routes.js 
│   │   │ 
│   │   ├── styles/             
│   │   │   ├── sass/     
│   │   │   └── style.sass       
│   │                     
│   ├── views/                      
│   │   │              
│   │   └── index.pug                         
│   │  
│   └── server.js                           
│  
├── test/                                       
│   └── example.js                      
│  
├── .babelrc
├── .eslintignore
├── .eslint
├── .gitignore       
├── gulpfile.js          
├── package.json                         
└── readme.md                  
```

#