import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should display login page with all elements', async ({ page }) => {
    // Check heading
    await expect(page.locator('h1')).toContainText('Sign In');

    // Check subheading
    await expect(page.locator('p')).toContainText('Sign in or create an account');

    // Check buttons exist
    await expect(page.locator('button:has-text("Continue with shop")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeVisible();

    // Check email input exists
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Check divider text
    await expect(page.locator('span:has-text("or")')).toBeVisible();
  });

  test('should display background image', async ({ page }) => {
    // Check that the background image is set
    const backgroundDiv = page.locator('div[style*="backgroundImage"]');
    await expect(backgroundDiv).toBeVisible();
  });

  test('should have proper form styling', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');

    // Check that email input has proper styling
    await expect(emailInput).toHaveAttribute('class', /rounded-2xl/);
    await expect(emailInput).toHaveAttribute('class', /border-2/);
  });

  test('should handle email input', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');

    // Type email
    await emailInput.fill('test@example.com');

    // Check the value
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('should have signup link', async ({ page }) => {
    // Check signup link exists
    await expect(page.locator('a:has-text("Create one")')).toBeVisible();
    await expect(page.locator('a:has-text("Create one")')).toHaveAttribute('href', '/signup');
  });

  test('should have burgundy shop button with correct color', async ({ page }) => {
    const shopButton = page.locator('button:has-text("Continue with shop")');

    // Check the button has the right background color class
    await expect(shopButton).toHaveAttribute('class', /bg-\[#8B4555\]/);
  });

  test('should have dark gray continue button', async ({ page }) => {
    const continueButton = page.locator('button:has-text("Continue")');

    // Check the button has the right background color
    await expect(continueButton).toHaveAttribute('class', /bg-gray-800/);
  });
});
