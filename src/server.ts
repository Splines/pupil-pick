import express from 'express';
import fs from 'fs';
import path from 'path';
// Here we import our function getRandomInt from our own file src/util.ts
import { getRandomInt } from './util';

// Here you'll find a "Hello World" application in Express.js:
// http://expressjs.com/de/starter/hello-world.html
const app = express();

const NAMES_LIST_PATH = './src/NamesList.txt';

// Serve public folder
app.use(express.static(path.resolve('public')));

// just for a quick test
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Get a random number between 0 (inclusive) and max (exclusive)
app.get('/rand', (req, res) => {
    if (!req.query.max) {
        return res.status(400).send('You need to specify "max" as query param');
    }
    const rand = getRandomInt(Number(req.query.max));
    res.send({
        min: 0,
        max: req.query.max,
        rand: rand
    });
});

// Get a random pupil
app.get('/randomPupil', (req, res) => {
    const pupil = getRandomPupil();
    res.send({
        name: pupil?.toString()
    });
});

function getRandomPupil(): string | undefined {
    try {
        // Read the file synchronously and split on line breaks.
        const namesFile = fs.readFileSync(NAMES_LIST_PATH, 'utf-8');
        const names: string[] = namesFile.split(/\r?\n/);

        // Get a random element from the array of names
        const randIndex = getRandomInt(names.length);
        return names[randIndex];
    }
    catch {
        return; // no special handling in our case
    }
}

// Serve all other GET routes, '*' is used as wildcard here
// Note that it is important that you put this app.get('*')
// AFTER all the other endpoints.
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

// Start listening
// process.env.PORT is used, if you deploy this app to Heroku.
// Heroku will define an environment variable called 'PORT'
// which we will have to use to get our app up and running.
// "process.env.PORT || 8080" means: if there is a PORT variable
// defined in the environmental variables, take that one as PORT,
// but if it is not defined (e.g. when you test this on your local machine)
// just use port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`⚡ Server up and running: http://localhost:${PORT}`);
});
