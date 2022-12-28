// https://github.com/microsoft/playwright/blob/main/docs/src/test-api-testing-js.md#sending-api-requests-from-ui-tests
// @ts-check
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Create Account', () => {
  test.beforeEach(async ({ page }) => {
    const nominatorId = 0
    const email = 'team@outputfield.com'
    await page.goto(`/create-account?email=${email}&nominatorId=${nominatorId}`)
  })

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('is the correct page', ({ page }) => {
    const pageTitle = page.getByRole('heading', { name: 'New Profile' })
    expect(pageTitle).toBeVisible
  })

  test('gives error feedback for required fields', async ({ page }) => {
    // Try submitting empty form
    const saveButton = page.getByText('SAVE')
    await saveButton.click()

    // Expect Errors for Name, Title, Location, Pronouns, Links, and Works
    expect(page.getByAltText('error icon Name')).toBeVisible
    expect(page.getByAltText('error icon Title')).toBeVisible
    expect(page.getByAltText('error icon Location')).toBeVisible
    expect(page.getByAltText('error icon Pronouns')).toBeVisible
    expect(page.getByText('Please add at least one personal link.')).toBeVisible
    expect(page.getByText('Please add at least one work.')).toBeVisible
    
  })

  test('correct submission', async ({ page }) => {
    // fill fields
    page.getByLabel('Name').fill('Keef Deepa')
    page.getByLabel('Title').fill('future engineer')
    page.getByLabel('Handle').fill('newuserhere')
    page.getByLabel('Pronouns').fill('he/they')
    page.getByLabel('Mediums', { exact: true }).fill('3D, tattoos')
    page.getByLabel('Mediums of Interest').fill('metal, wood')
    page.getByLabel('Location').fill('Berlin, Germany')
    page.getByLabel('Bio').fill('Im very interesting, and I forgot an apostrophe right there.')
    expect(page.getByAltText('error icon Name')).toBeHidden
    expect(page.getByAltText('error icon Title')).toBeHidden
    expect(page.getByAltText('error icon Location')).toBeHidden
    expect(page.getByAltText('error icon Pronouns')).toBeHidden
  
  
    // - - - ADD A LINK - - -
    await page.getByRole('button', { name: '+ Add' }).click()
    await page.getByRole('button', { name: '- Remove' }).click()
    // expect removing a link works
    expect(page.getByPlaceholder('Enter your website')).toBeHidden

    await page.getByRole('button', { name: '+ Add' }).click()
    await page.getByPlaceholder('Enter your website').fill('https://google.com')
    await page.getByPlaceholder('Label').fill('My Website')
    expect(page.getByText('Please add at least one personal link.')).toBeHidden


    // - - - ADD A WORK - - - 
    //  embedded work
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
