// @ts-check
import { test, expect } from '@playwright/test'

// https://github.com/microsoft/playwright/blob/main/docs/src/test-api-testing-js.md#sending-api-requests-from-ui-tests
test.skip('Create Account - correct entry creates correct feedback', async ({ page }) => {
  const nominatorId = 0
  const email = 'team@outputfield.com'
  await page.goto(`./sign-up?email=${email}&nominatorId=${nominatorId}`)

  // Expect a title "to contain" a substring.
  //   await expect(page).toHaveTitle(/Playwright/)

  // create a locator
  const getStarted = page.locator('text=Get Started')

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro')

  // Click the get started link.
  await getStarted.click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/)
})