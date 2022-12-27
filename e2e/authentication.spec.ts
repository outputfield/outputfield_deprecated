import test, { expect } from '@playwright/test'

test.describe('Non- user', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('can see options in nav Artists, and Login', async ({ page }) => {
    await page.getByRole('button', { name: 'Home select arrow' }).click()

    expect(page.getByRole('link', {name: 'Artists'})).toBeVisible
    expect(page.getByRole('link', {name: 'Login'})).toBeVisible
  })

  test.describe('in artist Contact', () => {
    test('can send topics Invite, Inquiry, and Commision', async ({ page }) => {
      await page.goto('/artists')
      await page.locator('[data-test-id="artistRow"]').first().click()
      await page.getByText('Info').click()
      await page.getByRole('button', { name: 'contact' }).click()
      
      expect(page.locator('#topicSelector div').filter({ hasText: 'Invite' })).toBeVisible
      expect(page.locator('#topicSelector div').filter({ hasText: 'Commission' })).toBeVisible
      expect(page.locator('#topicSelector div').filter({ hasText: 'Inquiry' })).toBeVisible
    })
  })
})

test.describe.only('User', () => {
  test.describe('after failed auth', () => {
    test('sees error feedback',async ({ page }) => {
      await page.goto('/login')
      await page.getByPlaceholder('Your email address').fill('test+fail@magic.link')
      await page.getByRole('main').getByRole('button', { name: 'Login' }).click()

      expect(page.getByText('User not found.')).toBeVisible
    })
  })

  test.describe('after successful auth', () => {
    test.use({ storageState: './e2e/userStorageState.json' })
    
    test('can see options in nav: "Artists", "Profile", "Account Settings" and "Logout"', async ({ page }) => {
      await page.goto('/')
      await page.getByRole('button', { name: 'Home select arrow' }).click()

      expect(page.getByRole('link', {name: 'Artists'})).toBeVisible
      expect(page.getByRole('link', {name: 'Profile'})).toBeVisible
      expect(page.getByRole('link', {name: 'Account Settings'})).toBeVisible
      expect(page.getByRole('link', {name: 'Logout'})).toBeVisible
    })

    test.describe('in artist Contact', () => {
      test('can send topics: "Collab", "Business", and "Other"', async ({ page }) => {
        await page.goto('/artists')
        await page.locator('[data-test-id="artistRow"]').first().click()
        await page.getByText('Info').click()
        await page.getByRole('button', { name: 'contact' }).click()
      
        expect(page.locator('#topicSelector div').filter({ hasText: 'Collab' })).toBeVisible
        expect(page.locator('#topicSelector div').filter({ hasText: 'Business' })).toBeVisible
        expect(page.locator('#topicSelector div').filter({ hasText: 'Other' })).toBeVisible
      })
    })
  })
})