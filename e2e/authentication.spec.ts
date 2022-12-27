import test, { expect } from '@playwright/test'

test.describe('Non- user', () => {
  test.beforeEach(async ({ page }) => {
    page.goto('/')
  })

  test('can see options in nav Artists, and Login', async ({ page }) => {
    await page.getByRole('button', { name: 'Home select arrow' }).click()

    expect(page.getByRole('link', {name: 'Artists'})).toBeVisible
    expect(page.getByRole('link', {name: 'Login'})).toBeVisible
  })

  test.describe('in artist Contact', () => {
    test('can send topics Invite, Inquiry, and Commision', async ({ page }) => {
      await page.goto('/artists/')
      await page.locator('[data-test-id="artistRow"]').first().click()
      await page.getByText('Info').click()
      await page.getByRole('button', { name: 'contact' }).click()
      
      expect(page.locator('#topicSelector div').filter({ hasText: 'Invite' })).toBeVisible
      expect(page.locator('#topicSelector div').filter({ hasText: 'Commission' })).toBeVisible
      expect(page.locator('#topicSelector div').filter({ hasText: 'Inquiry' })).toBeVisible
    })
  })
})

test.describe('User', () => {
  test.beforeEach(async ({ page }) => {
    page.goto('/login')
  })

  test.describe('after failed auth', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Your email address').fill('test+fail@magic.link')
    })

    test('sees error feedback',async ({ page }) => {
      // TODO:
    })
  })

  test.describe('after successful auth', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Your email address').fill('test+success@magic.link')
    })

    test('can see options in nav _, _, and _')
    test('can view account settings')
    test('can click Logout')
    test.describe('in artist Contact', () => {
      test('can send topics_, _, and _')
    })
  })
})