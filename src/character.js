import fetch from 'node-fetch'

import random from './utils.js'


export async function getCharacterData(id) {
    let url = `https://akabab.github.io/superhero-api/api/id/${id}.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data
}


export class Character {
    constructor (data) {
        this.actualStamina = random(0, 10);
        this.attackNumber = 3
        this.setCharacterData(data);
        this.setHealthPoints()
    }

    setCharacterData (data) {
        this.intelligence = data.powerstats.intelligence;
        this.strength = data.powerstats.strength;
        this.speed = data.powerstats.speed;
        this.durability = data.powerstats.durability;
        this.power = data.powerstats.power;
        this.combat = data.powerstats.combat;
        this.alignment = data.biography.alignment;
    }

    setFiliationCoefficient (teamAlignment) {
        if (teamAlignment == this.alignment || this.alignment=='neutral') {
            this.filiationCoefficient = random(1, 10)
        } else {
            this.filiationCoefficient = random(1, 10) ** -1
        }
    }

    setHealthPoints () {
        const healthPoint = (((this.strength * 0.8 + this.durability * 0.7 + this.power)/2.0 * (1 + (this.actualStamina/10.0))) + 100);
        this.healthPoint = healthPoint;
    }

    getMentalAttack () {
        const mentalAttack = (this.intelligence * 0.7 + this.speed * 0.2 + this.combat * 0.1) * this.filiationCoefficient;
        return mentalAttack
    }

    getStrongAttack () {
        const strongAttack = (this.strength * 0.6 + this.power * 0.2 + this.combat * 0.2) * this.filiationCoefficient;
        return strongAttack
    }

    getFastAttack () {
        const fastAttack = (this.speed * 0.55 + this.durability * 0.25 + this.strength * 0.2) * this.filiationCoefficient;
        return fastAttack
    }

    attack (character) {
        const selectAttack = random(0, 2)
        if (selectAttack == 0) {
            const attackValue = getMentalAttack()
        } else if (selectAttack == 1) {
            const attackValue = getStrongAttack()
        } else {
            const attackValue = getFastAttack()
        }
        character.healthPoint -= attackValue
    }
}

export default Character;