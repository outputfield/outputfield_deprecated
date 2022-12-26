// @ts-check
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// TODO:
// Steps:
//  1. Run a 'seed' for DB (test.beforeAll)

test.beforeEach(async ({ page }) => {
  page.goto('/artists')
})

test.describe('Artists list', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

test.describe('Artists filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Filter Filter icon' }).click()
  })
  
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should filter results by medium', async ({ page }) => {
    // Expect full page of results to begin

    // TODO: 
    await page.locator('#filter').getByText('code').click()
    await page.locator('#filter').getByText('toys').click()
    await page.getByRole('button', { name: 'Filter (2)' }).click()

    expect(page.getByTestId('artistRow')).toHaveLength(3)  
  })

  // TODO:
  test('clear filters', async ({ page }) => {
    // open FILTER
    // click 'clear filters'
  })

  // TODO:
  test('should filter results by search term', async ({ page }) => {
    // click on search bar
    // fill search term
    // expect matching results
  })
})

// ArtistsScreens
//    View
//    Contact
test.describe('Artist view', () => {
  test.beforeEach(async ({ page }) => {
    page.goto('/artists/newguyhere')
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  // TODO:
  test.describe('Artist contact', () => {
    // test.beforeEach navigate to INFO > Contact

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
