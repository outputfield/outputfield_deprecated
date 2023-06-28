// @ts-check
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe.only('Invitations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/account/invitation')
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should show remaining invites out of total', async ({ page }) => {
    await expect(page.getByTestId('invitation-remaining')).toHaveText('You have 2/3 invites remaining.')
  })

  test('should generate copyable invitation link', async ({ page, browserName }) => {
    test.skip(browserName==='firefox' || browserName==='Mobile Chrome' || browserName==='chromium', 'cannot test clipboard in this browser')
    const EXAMPLE_INVITATION_LINK = 'outputfield.com/applications?i=1abc-123'
    
    // assert: link text exists on page
    await page.locator('#invitation-link').click()

    // action: click link to copy to clipboard
    await page.getByText('copy').click()
    
    // assert: link exists in clipboard
    const clipboardText1 = await page.evaluate('navigator.clipboard.readText()')
    expect(clipboardText1).toContain(EXAMPLE_INVITATION_LINK)

    // assert: feedback success message
  })
})