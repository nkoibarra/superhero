import random from './utils.js';

export const MAX_CHARACTER_ID = 732
export const MIN_CHARACTER_ID = 1
export const TEAM_SIZE = 5


export function getRandomIds(min, max, len) {
    if (max - min + 1 < len) {
        return null
    }
    const charactersIds = []
    while (charactersIds.length < len) {
        const newCharacterId = random(min, max);
        if (!charactersIds.includes(newCharacterId)) {
            charactersIds.push(newCharacterId)
        }
    }
    return charactersIds
}


class Team {
    constructor(charactersList) {
        this.charactersList = charactersList
        this.alignment = undefined
        this.setAligment()
        this.setCharacterFiliationCoefficient()
    }

    setAligment() {
        // Even number of alignment 'bad' and 'good' correspond to team alignment 'good'.
        let count = [0,0];
        this.charactersList.forEach(function (character) {
            if (character.alignment == "good") {
                count[0] += 1; 
            } else if (character.alignment == "bad") {
                count[1] += 1; 
            }
        });
        const sum = count.reduce((partialSum, a) => partialSum + a, 0);
        if (count[0] >= Math.round(sum / 2)) {
            this.alignment = "good"
        } else {
            this.alignment = "bad"
        }
    }

    setCharacterFiliationCoefficient() {
        const teamAlignment = this.alignment
        this.charactersList.forEach(function (character) {
            character.setFiliationCoefficient(teamAlignment)
        });
    }

    selectRandomCharacter () {
        const randomNumber = random(0, this.charactersList.length - 1)
        return this.charactersList[randomNumber]
    }
}


export default Team;