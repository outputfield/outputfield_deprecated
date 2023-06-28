// @ts-check
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Artists list', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/artists')
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

test.describe('Artists filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/artists')
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.getByRole('button', { name: 'Filter Filter icon' }).click()
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should filter results by medium', async ({ page }) => {
    await expect(page.getByTestId('artistRow')).toHaveCount(5)

    await page.getByRole('button', { name: 'Filter Filter icon' }).click()
    await page.locator('#filter').getByText('tattoo').click()
    await page.getByRole('button', { name: 'Filter (1)' }).click()
    await expect(page.getByTestId('artistRow')).toHaveCount(1)  

    await page.getByRole('button', { name: 'Filter (1) Filter icon' }).click()
    await page.locator('#filter').getByText('photo / film').click()
    await page.getByRole('button', { name: 'Filter (2)' }).click()
    await expect(page.getByTestId('artistRow')).toHaveCount(3)
  })

  test('clear filters', async ({ page }) => {   
    await page.getByRole('button', { name: 'Filter Filter icon' }).click()
    await page.locator('#filter').getByText('tattoo').click()
    await page.locator('#filter').getByText('photo / film').click()
    
    // expect two filters to be checked
    expect(page.locator('label').filter({ hasText: 'tattoo' }).getByRole('img', { name: 'checked icon' })).toBeVisible
    expect(page.locator('label').filter({ hasText: 'photo / film' }).getByRole('img', { name: 'checked icon' })).toBeVisible

    await page.getByRole('button', { name: 'Clear Filters' }).click()
    expect(page.getByRole('img', { name: 'checked icon' })).toBeHidden
  })

  test('should filter results by search term', async ({ page }) => {
    await expect(page.getByTestId('artistRow')).toHaveCount(5)

    await page.getByPlaceholder('Search').fill('Chicago')
    await expect(page.getByTestId('artistRow')).toHaveCount(2)
  })

  test('reset all', async ({ page }) => {
    // check and submit two filters
    await page.getByRole('button', { name: 'Filter Filter icon' }).click()
    await page.locator('#filter').getByText('photo / film').click()
    await page.getByRole('button', { name: 'Filter (1)' }).click()
    await expect(page.getByTestId('artistRow')).toHaveCount(2)

    // enter a search term
    await page.getByPlaceholder('Search').fill('New York')
    await expect(page.getByTestId('artistRow')).toHaveCount(1)

    // click on 'reset all'
    await page.getByRole('button', { name: 'reset all' }).click()

    await expect(page.getByTestId('artistRow')).toHaveCount(5)
  })
})

// ArtistsScreens
//    View
//    Contact
test.describe('Artist view', () => {
  test.beforeEach(async ({ page }) => {
    page.goto('/artists')
    await page.getByTestId('artistRow').first().click()
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  // TODO:
  test.describe.skip('Artist contact', () => {
    // test.beforeEach navigate to INFO > Contact
    test.beforeEach(async ({ page }) => {
      await page.getByRole('tab', { name: 'Info' }).click()
      await page.getByRole('button', { name: 'contact' }).click()
    })

    test('Non-user contacts artist', async ({ page }) => {
    // expect SEND button is disabled
      // expect inputs are disabled

      // click topic option 1
      // expect 'EMAIL REQUIRED'
      // Expect 'SUBJECT REQUIRED'
      // Expect 'MESSAGE REQUIRED'

      // Fill invalid email address
      // Expect 'INVALID EMAIL ADDRESS' message

      // fill valid email
      // fill subject
      // fill message

      // click SEND
    })

    // TODO: Going to have to create auth.json for this...
    test.skip('User contacts artist', async ({ page }) => {
      // click topic option 1
      // Expect 'SUBJECT REQUIRED'
      // Expect 'MESSAGE REQUIRED'

      // fill subject
      // fill message

      // click SEND
    })

    test('back to artist info', async ({ page }) => {
      // expect Contact view no longer visible
    })
  })
})
