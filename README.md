# Project description

A simple chatbot using Express, React and MongoDB.

Chatbot server is implemented using the express framework, the client is built using react-redux and MongoDB is used for storing the data.
For simplicity the client project is structured inside of the server project and the "client" subdirectory can be run independently for production deployments. To keep the things simple and for faster development run the single command "npm run dev" to run both server and client processes.


An example of typical input would be something like this:

> **user:** hello  
> **bot:**  Hi, how can I help you?  
> **user:** I want to check my bank balance for my savings account  
> **bot:** Sure, you have R2000 in your account  
> **bot:** Can I help you with anything else?  
> **user:** No thanks  
> **bot:** Great, Come back soon!  


## How it works

Each time a user enters a statement, the text that they entered and the text that the statement was in response to is stored in the DB. The program selects the closest matching response by searching for the closest matching known statement that matches the input, it then returns the most likely response to that statement.


## Installation

```
cd chatbot 
#Go to project directory

npm install 
#To install the dependencies (Server project)

cd client 
#Go to sub directory "chatbot/client" (React project)

npm install 
#To install the dependencies (Client project)
```

## Other dependencies
```
Setup mongoDB on the system - replace the url in .env

Remember to add the .env file in .gitignore for your personal projects
```

## Run both server and client

```
cd chatbot
#Go to project directory 

npm run dev
# 3000 port for client/React and 5000 port for server/Express
```

## By default

```
server: http://localhost:5000

client: http://localhost:3000

mongodb: mongodb://localhost:27017
```

## Directory structure

```

Server: 
/chatbot                   - Express server code
/chatbot/app/              - Router and controller files (module wise)
/chatbot/models/           - DB model
/chatbot/response.js       - Chatbot logic
/chatbot/server.js         - Main entry file for node API server


Client:
/chatbot/client            - Independent of the server code (not a monolithic app)

```
