import chai, { expect } from 'chai';

import { getRandomIds } from "../src/team.js";
import { Character, getCharacterData } from "../src/character.js"
import Team from "../src/team.js"


chai.should();

describe('get random ids', function() {
    it('returns a list of ints', function() {
        const listIds = getRandomIds(1, 2, 2)
        expect(listIds).to.include(1)
        expect(listIds).to.include(2)
    })
    it('returns null for invalid input', function() {
        const listIds = getRandomIds(1, 1, 2)
        expect(listIds).to.equal(null)
    })
})

describe('set team alignment', function() {
    it('create team', async function() {
        const charData = await getCharacterData(1)
        const char2Data = await getCharacterData(2)
        const char4Data = await getCharacterData(4)
        const newCharacter = new Character(charData)
        const newCharacter2 = new Character(char2Data)
        const newCharacter4 = new Character(char4Data)
        const charactersList = [ newCharacter, newCharacter2, newCharacter4 ]
        const team = new Team(charactersList)
        expect(team.alignment).to.equal("good")
    })
})