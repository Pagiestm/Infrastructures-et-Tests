import { describe, it, expect } from 'vitest';
import { calculate } from '../../App';

describe('calculate', () => {
    it('should correctly evaluate mathematical expressions', () => {
        expect(calculate('1 + 2')).toBe('3');
        expect(calculate('-1 + -2')).toBe('-3');
        expect(calculate('1 + -2')).toBe('-1');
        expect(calculate('1 + 0')).toBe('1');
        expect(calculate('5 - 3')).toBe('2');
        expect(calculate('-5 - -3')).toBe('-2');
        expect(calculate('5 - -3')).toBe('8');
        expect(calculate('5 - 0')).toBe('5');
        expect(calculate('2 * 3')).toBe('6');
        expect(calculate('-2 * -3')).toBe('6');
        expect(calculate('2 * -3')).toBe('-6');
        expect(calculate('2 * 0')).toBe('0');
    });

    it('should return "Error" for invalid expressions', () => {
        expect(calculate('1/0')).toBe('Error');
        expect(calculate('1++2')).toBe('Error');
      });
});
