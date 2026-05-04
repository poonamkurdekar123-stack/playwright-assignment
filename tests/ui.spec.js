const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('UI Flow', async ({ page }) => {

  await page.goto('https://demoqa.com/books');

  // Wait for search box
  await expect(page.locator('#searchBox')).toBeVisible();

  // Search for book
  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');

  // Click on the book (this is key fix)
  const bookLink = page.locator('text=Learning JavaScript Design Patterns');
  await expect(bookLink).toBeVisible({ timeout: 15000 });
  await bookLink.click();

  // Now we are on book details page → very stable
  await expect(page.locator('#title-wrapper')).toBeVisible();

  // Extract values
  const title = await page.locator('#title-wrapper #userName-value').textContent();
  const author = await page.locator('#author-wrapper #userName-value').textContent();
  const publisher = await page.locator('#publisher-wrapper #userName-value').textContent();

  console.log(title, author, publisher);

  // Validate
  expect(title).toContain('JavaScript Design Patterns');

  // Save to file
  fs.writeFileSync('bookDetails.txt',
    `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}`
  );

});