"use strict";
import express from 'express'
import Character, { getCharacterData } from './character.js';
import Team from './team.js'
import { getRandomIds, MAX_CHARACTER_ID, MIN_CHARACTER_ID, TEAM_SIZE } from './team.js'


const app = express();
const port = 8080;


app.get('/fight', async function(req, res, next) {
  const charactersList = []
  try {
    const charactersIds = getRandomIds(MIN_CHARACTER_ID, MAX_CHARACTER_ID, TEAM_SIZE)
    for (var index in charactersIds) {
      const charData = await getCharacterData(charactersIds[index])
      const newCharacter = new Character(charData)
      charactersList.push(newCharacter)
    }
    const team = new Team(charactersList)

    res.status(200).send(team)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

app.get('/healthcheck', (req, res) => {
  res.status(200).send('ok');
});

app.listen(port, () => {
  console.log(`Superhero fight listening on port ${port}`);
});

export default app;