// https://github.com/microsoft/playwright/blob/main/docs/src/test-api-testing-js.md#sending-api-requests-from-ui-tests
// @ts-check
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Apply', () => {
  test.beforeEach(async ({ page }) => {
    const nominatorId = 0
    await page.goto(`/applications?i=${nominatorId}`)
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('is the correct page', ({ page }) => {
    const pageTitle = page.getByRole('heading', { name: 'Application' })
    expect(pageTitle).toBeVisible
  })

  test('gives error feedback for required fields', async ({ page }) => {
    // Try submitting empty form
    const submitButton = page.getByText('SUBMIT')
    await submitButton.click()

    // Expect Errors for Name, Email, Links, and Works
    expect(page.getByAltText('error icon Name')).toBeVisible
    expect(page.getByAltText('error icon Email')).toBeVisible
    expect(page.getByText('Please add at least three works.')).toBeVisible
  })

  test('correct submission', async ({ page }) => {
    // fill fields
    page.getByLabel('Name').fill('Keef Deepa')
    page.getByLabel('Email').fill('future engineer')
    expect(page.getByAltText('error icon Name')).toBeHidden
    expect(page.getByAltText('error icon Email')).toBeHidden
  
    // - - - ADD A WORK - - - 
    await page.locator('#grid-upload-work-1').click()
    await page.getByRole('button', { name: 'close' }).click()
    expect(page.getByRole('tab', { name: 'Upload' })).toBeHidden

    await page.locator('#grid-upload-work-1').click()
    await page.getByRole('tab', { name: 'Embed' }).getByText('Embed').click()
    // enter invalid link URL
    await page.getByPlaceholder('Link: Youtube, Vimeo, SoundCloud, etc.').fill('awef')
    await page.getByPlaceholder('Title').fill('A Video')
    await page.getByRole('button', { name: 'Embed' }).click()
    // expect error feedback 'Not a valid URL.'
    expect(page.getByText('Not a valid URL.')).toBeVisible
    // enter valid link URL
    await page.getByPlaceholder('Link: Youtube, Vimeo, SoundCloud, etc.').fill('https://soundcloud.com/four-tet/kh-essential-mix-2022')
    await page.getByRole('button', { name: 'Embed' }).click()
    expect(page.getByText('file here!1')).toBeVisible

    // uploaded work
    await page.locator('#grid-upload-work-2').click()
    await page.getByRole('tabpanel', { name: 'Upload' }).getByLabel('Upload').setInputFiles('./public/extarrow.png')

    // expect no errors to be visible
    expect(page.getByText('Please add at least one work.')).toBeHidden
  
    // TODO: (passes up to here)
    // - - - SUBMISSION - - -
    // expect redirect to /login
    const navigationPromise = page.waitForNavigation()
    const saveButton = page.getByText('SAVE')
    await saveButton.click()
    await navigationPromise
    expect(page).toHaveURL(/.*login/)

    // expect API POST req with body... {}
  })
})
