import chai, { expect } from 'chai';

import { Character, getCharacterData } from "../src/character.js";


chai.should();

describe('Character', function() {
    let charData = undefined
    before(async function() {
        charData = await getCharacterData(1)
    })

    it('set superhero atributes', async function() {
        const newCharacter = new Character(charData)
        expect(newCharacter.actualStamina).to.be.within(0,10)
        expect(newCharacter.intelligence).to.equal(38)
        expect(newCharacter.strength).to.equal(100)
        expect(newCharacter.speed).to.equal(17)
        expect(newCharacter.durability).to.equal(80)
        expect(newCharacter.power).to.equal(24)
        expect(newCharacter.combat).to.equal(64)
        expect(newCharacter.alignment).to.equal("good")
        
    })
    it('set actual stamina between 0 to 10', async function() {
        const newCharacter = new Character(charData)
        expect(newCharacter.actualStamina).to.be.within(0,10)
    })
    it('set filiation coefficient', async function() {
        const newCharacter = new Character(charData)
        newCharacter.setFiliationCoefficient('good')
        expect(newCharacter.filiationCoefficient).to.be.within(1,10)
        newCharacter.setFiliationCoefficient('bad')
        expect(newCharacter.filiationCoefficient).to.be.within(0,1)
    })
    it('set attack', async function() {
        const newCharacter = new Character(charData)
        newCharacter.filiationCoefficient = 1
        expect(newCharacter.getMentalAttack()).to.equal(38 * 0.7 + 17 * 0.2 + 64 * 0.1)
        expect(newCharacter.getStrongAttack()).to.equal(100 * 0.6 + 24 * 0.2 + 64 * 0.2)
        expect(newCharacter.getFastAttack()).to.equal(17 * 0.55 + 80 * 0.25 + 100 * 0.2)
    })
    it('set health power', async function() {
        const newCharacter = new Character(charData)
        newCharacter.actualStamina = 1
        newCharacter.setHealthPoints()
        expect(newCharacter.healthPoint).to.equal(((100 * 0.8 + 80 * 0.7 + 24)/2 * (1 + (1/10))) + 100)
    })
})