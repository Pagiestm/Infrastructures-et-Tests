import { describe, it, expect } from 'vitest';
import { calculate } from '../../src/App';

describe('calculate', () => {
    describe('addition', () => {
        it('should correctly evaluate addition expressions', () => {
            expect(calculate('1 + 2')).toBe('3');
            expect(calculate('-1 + -2')).toBe('-3');
            expect(calculate('1 + -2')).toBe('-1');
            expect(calculate('1 + 0')).toBe('1');
        });
    });

    describe('subtraction', () => {
        it('should correctly evaluate subtraction expressions', () => {
            expect(calculate('5 - 3')).toBe('2');
            expect(calculate('-5 - -3')).toBe('-2');
            expect(calculate('5 - -3')).toBe('8');
            expect(calculate('5 - 0')).toBe('5');
        });
    });

    describe('multiplication', () => {
        it('should correctly evaluate multiplication expressions', () => {
            expect(calculate('2 * 3')).toBe('6');
            expect(calculate('-2 * -3')).toBe('6');
            expect(calculate('2 * -3')).toBe('-6');
            expect(calculate('2 * 0')).toBe('0');
        });
    });

    describe('division', () => {
        it('should correctly evaluate division expressions', () => {
            expect(calculate('6 / 3')).toBe('2');
            expect(calculate('-6 / -3')).toBe('2');
            expect(calculate('6 / -3')).toBe('-2');
            expect(calculate('0 / 3')).toBe('0');
            expect(calculate('3 / 0')).toBe('Error');
        });
    });

    describe('complex expressions', () => {
        it('should correctly evaluate expressions with multiple operations', () => {
            expect(calculate('1 + 2 * 3')).toBe('7');
            expect(calculate('1 + 2 * 3 - 4')).toBe('3');
            expect(calculate('1 + 2 * 3 - 4 / 2')).toBe('5');
        });

        it('should correctly evaluate expressions with parentheses', () => {
            expect(calculate('(1 + 2) * 3')).toBe('9');
            expect(calculate('1 + (2 * 3) - 4')).toBe('3');
            expect(calculate('(1 + 2) * (3 - 4) / 2')).toBe('-1.5');
        });
    });

    describe('Error', () => {
        it('should return "Error" for invalid expressions', () => {
            expect(calculate('1/0')).toBe('Error');
            expect(calculate('1++2')).toBe('Error');
            expect(calculate('1..2')).toBe('Error');
            expect(calculate('1 + (2 * 3')).toBe('Error');
            expect(calculate('1 + 2) * 3')).toBe('Error');
            expect(calculate('')).toBe('Error');
            expect(calculate(' ')).toBe('Error');
        });
    });
});
