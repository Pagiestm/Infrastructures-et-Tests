// tests/e2e/calculator.test.js
import { test, expect } from '@playwright/test';

test.describe('Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Addition de nombres positifs
  test('adds 1 + 2 to equal 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('3');
  });

  // Addition de nombres négatifs
  test('adds -1 + -2 to equal -3', async ({ page }) => {
    await page.click('button:has-text("-")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-3');
  });

  // Addition d'un nombre positif et d'un nombre négatif 
  test('adds 1 + -2 to equal -1', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-1');
  });

  // Addition avec zéro
  test('adds 1 + 0 to equal 1', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('1');
  });

  // Soustraction de nombres positifs
  test('subtracts 5 - 3 to equal 2', async ({ page }) => {
    await page.click('button:has-text("5")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('2');
  });

  // Soustraction de nombres négatifs
  test('subtracts -5 - -3 to equal -2', async ({ page }) => {
    await page.click('button:has-text("-")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-2');
  });

  // Soustraction d'un nombre positif et d'un nombre négatif
  test('subtracts 5 - -3 to equal 8', async ({ page }) => {
    await page.click('button:has-text("5")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('8');
  });

  // Soustraction avec zéro
  test('subtracts 5 - 0 to equal 5', async ({ page }) => {
    await page.click('button:has-text("5")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('5');
  });

  // Multiplication de nombres positifs
  test('multiplies 2 * 3 to equal 6', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('6');
  });

  // Multiplication de nombres négatifs
  test('multiplies -2 * -3 to equal 6', async ({ page }) => {
    await page.click('button:has-text("-")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('6');
  });

  // Multiplication d'un nombre positif et d'un nombre négatif
  test('multiplies 2 * -3 to equal -6', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-6');
  });

  // Multiplication avec zéro
  test('multiplies 2 * 0 to equal 0', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('0');
  });

  // Division de nombres positifs
  test('divides 6 / 3 to equal 2', async ({ page }) => {
    await page.click('button:has-text("6")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('2');
  });

  // Division de nombres négatifs
  test('divides -6 / -3 to equal 2', async ({ page }) => {
    await page.click('button:has-text("-")');
    await page.click('button:has-text("6")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('2');
  });

  // Division d'un nombre positif et d'un nombre négatif
  test('divides 6 / -3 to equal -2', async ({ page }) => {
    await page.click('button:has-text("6")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-2');
  });

  // Division par zéro
  test('returns "Error" for division by zero', async ({ page }) => {
    await page.click('button:has-text("3")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  // Expressions complexes avec plusieurs opérations
  test('evaluates 1 + 2 * 3 to equal 7', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('7');
  });

  test('evaluates 1 + 2 * 3 - 4 to equal 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('3');
  });

  test('evaluates 1 + 2 * 3 - 4 / 2 to equal 5', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('5');
  });

  test('evaluates " 1 + 2 " to equal 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('3');
  });

  // Expressions avec parenthèses
  test('evaluates (1 + 2) * 3 to equal 9', async ({ page }) => {
    await page.click('button:has-text("(")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('9');
  });

  test('evaluates 1 + (2 * 3) - 4 to equal 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("(")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('3');
  });

  test('evaluates (1 + 2) * (3 - 4) / 2 to equal -1.5', async ({ page }) => {
    await page.click('button:has-text("(")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("(")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('-1.5');
  });

  // Tests d'erreur pour expressions invalides
  test('returns "Error" for invalid expression 1/0', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for invalid expression 1++2', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for invalid expression 1..2', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for invalid expression 1 + (2 * 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("(")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for invalid expression 1 + 2) * 3', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for empty expression', async ({ page }) => {
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });

  test('returns "Error" for expression with only spaces', async ({ page }) => {
    await page.type('.calculator__display', ' ');
    await page.click('button:has-text("=")');
    const displayValue = await page.$eval('.calculator__display', el => el.value);
    expect(displayValue).toBe('Error');
  });
});
