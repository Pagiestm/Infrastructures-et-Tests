import { describe, it, expect } from 'vitest';
import { add, subtract, multiply } from './calculator';

describe('Calculator', () => {
    
    // Addition de nombres positifs
    it('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    // Addition de nombres négatifs
    it('adds -1 + -2 to equal -3', () => {
        expect(add(-1, -2)).toBe(-3);
    });

    // Addition d'un nombre positif et d'un nombre négatif 
    it('adds 1 + -2 to equal -1', () => {
        expect(add(1, -2)).toBe(-1);
    });

    // Addition avec zéro
    it('adds 1 + 0 to equal 1', () => {
        expect(add(1, 0)).toBe(1);
    });

    // Soustraction de nombres positifs
    it('subtracts 5 - 3 to equal 2', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    // Soustraction de nombres négatifs
    it('subtracts -5 - -3 to equal -2', () => {
        expect(subtract(-5, -3)).toBe(-2);
    });

    // Soustraction d'un nombre positif et d'un nombre négatif
    it('subtracts 5 - -3 to equal 8', () => {
        expect(subtract(5, -3)).toBe(8);
    });

    // Soustraction avec zéro
    it('subtracts 5 - 0 to equal 5', () => {
        expect(subtract(5, 0)).toBe(5);
    });

    // Multiplication de nombres positifs
    it('multiplies 2 * 3 to equal 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    // Multiplication de nombres négatifs
    it('multiplies -2 * -3 to equal 6', () => {
        expect(multiply(-2, -3)).toBe(6);
    });

    // Multiplication d'un nombre positif et d'un nombre négatif
    it('multiplies 2 * -3 to equal -6', () => {
        expect(multiply(2, -3)).toBe(-6);
    });

    // Multiplication avec zéro
    it('multiplies 2 * 0 to equal 0', () => {
        expect(multiply(2, 0)).toBe(0);
    });
});
