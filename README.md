# Output Field



## Intro to the Folders

`/components` - reusable and page-specific components
`/e2e` - Playwright end-to-end test suite
`/lib` - utility functions
`/pages` - page components. Routing [docs](https://nextjs.org/docs/routing/introduction)
`/pages/api` - "server side" code. [Docs](https://nextjs.org/docs/api-routes/introduction)
`/outputfieldapplication` - Sanity CMS
`/prisma` - Prisma ORM schema
`/public` - static files, such as icons
`/styles` - style sheets
`/types` - general use Typescript types

## Configuration

You'll need `.env` and `.env.local`. Contact an admin for these.


## Seed the Database

From root, run `npm run seed` in a terminal window.
Check by running `npx prisma studio`.


## Run Development

Clone the repo, then navigate to the root of the project (where `package.json` lives) and run:
```
> npm install
> npm run dev
```
In the browser,  The project is best viewed in mobile mode (open the Inspector and toggle device view).



--- 

## Learn the Stack

* [Next.js](https://nextjs.org/) statically generated site
* Authentication with [Magic](https://magic.link/docs/introduction/what-is-magic)
* Data interfacing using [Sanity.io CMS](https://www.sanity.io/exchange/framework=nextjs)/ [Primsa ORM](https://www.prisma.io/docs/concepts/components/prisma-client/)
* Styling with [Tailwind.css](https://tailwindcss.com/docs/guides/nextjs)
* Media upload with [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)
* Email contact built with [SendGrid](https://www.freecodecamp.org/news/how-to-build-a-working-contact-form-with-sendgrid-and-next-js/)
* Deploy on [Vercel](https://vercel.com/solutions/nextjs)
* Figma wireframes [here](https://www.figma.com/file/nOVN00JxxMrwsn8sGB6oVW/OF-Overview?node-id=219%3A2879)