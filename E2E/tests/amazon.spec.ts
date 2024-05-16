import { test, expect } from '@playwright/test';

test.describe("Amazon's product page", () => {
    test("should found Accelerate book", async ({ page }) => {
        await page.goto("https://www.amazon.fr");
        const search = await page.getByRole("search");
        await search.getByRole("textbox").fill("accelerate");
        await search.getByRole("button").click();
        await page
            .getByRole("link", {
                name: "Accelerate: The Science Behind Devops: Building and Scaling High Performing Technology Organizations",
            })
            .first()
            .click();

        await expect(page).toHaveTitle(/Accelerate/);
    });
});

test("should contains product's details like title and price", async ({
    page,
  }) => {
    await page.goto(
      "https://www.amazon.fr/Accelerate-Building-Performing-Technology-Organizations/dp/1942788339"
    );
    const [heading, price, buyNow] = await Promise.all([
      // Amazon is using several heading level 1 (bad pattern)
      // We must use "name" to avoid matching several elements
      page.getByRole("heading", { level: 1, name: "Accelerate" }),
      page.locator("#corePriceDisplay_desktop_feature_div .a-price").first(),
      page.getByRole("button", { name: "Acheter cet article" }),
    ]);

    await Promise.all([
      expect(heading).toHaveText(
        /Accelerate: The Science Behind Devops: Building and Scaling High Performing Technology Organizations/
      ),
      expect(price).toBeVisible(),
      expect(buyNow).toBeVisible(),
    ]);
  });
