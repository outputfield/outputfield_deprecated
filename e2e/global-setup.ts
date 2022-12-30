import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://staging-outputfield.vercel.app/login')
  await page.getByPlaceholder('Your email address').fill('test+success@magic.link')
  await page.getByRole('main').getByRole('button', { name: 'Login' }).click()
  await page.context().storageState({ path: './e2e/userStorageState.json' })
  await browser.close()
}

export default globalSetup