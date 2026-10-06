# 7thSemsProject1 (Astra DB Data API version)
A small full-stack app that shows a list of favourite burgers.
Built for the "Learn NoSQL in 3 hours" course (Project 1).

Based on kubowania/burger-app by Ania Kubow
(https://github.com/kubowania/burger-app). The original uses the
Astra DB Document API, which has reached end-of-life, so I updated
the backend to use the Astra DB Data API.

## What I changed from the original
- index.js: calls the Data API (a POST request with find) instead of the Document API
- src/App.js: reads response.data.data.documents and uses _id as the key
- package.json: start:backend now runs `node index.js` (nodemon was not installed)
- Environment variables: ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN

## Tech
Node.js, Express, React, Astra DB (document database)

## How to run
1. Run `npm install`
2. Copy .env.sample to .env and fill in your own Astra DB values
3. Add burger documents to a collection called "burgers" in your Astra DB
4. Terminal 1: `npm run start:backend` (port 8000)
5. Terminal 2: `npm run start:frontend` (port 3000)
   (on Windows with newer Node versions, first run `set NODE_OPTIONS=--openssl-legacy-provider`)
