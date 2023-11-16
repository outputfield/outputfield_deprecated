// @ts-check
// 
// import { test, expect } from '@playwright/test'
// import FormData from 'form-data'
// import fs from 'fs'
// import prisma from '../lib/prisma'

// const NEW_USER = {
//   Name: 'Tim Johnson',
//   Title: 'painter',   
//   Handle: 'tjohnson',
//   Pronouns: 'he/they',
//   Location: 'Chicago, IL',
//   Mediums: 'acrylics, digital',
//   'Mediums of Interest': 'sculpture',
//   links: [{
//     url: 'timjohnsonartwork.com'
//   }],
//   Bio: 'I love to paint and break shit', 
//   email: 'tikiboi@gmail.com',
//   nominatorId: 1,
// }

// // test.beforeAll(async ({ request }) => {
// //   // Deleting user should cascasde to linked Artist      
// //   const deleteUser = await prisma.user.delete({
// //     where: {
// //       email: NEW_USER.email,
// //     },
// //   })

// //   const user = await prisma.user.findUnique({
// //     where: {
// //       email: 'elsa@prisma.io',
// //     },
// //   })
// //   expect(user).toBeNull()
// // })

// test('POST /api/createAccount', async({ request, baseURL }) => {
//   const postRequest = await request.post(`${baseURL}/api/createAccount`, {
//     data: NEW_USER
//   })
//   console.log(postRequest)
//   console.log(await postRequest.json())
//   expect(postRequest.ok()).toBeTruthy()
//   //   expect(postRequest.status()).toBe(201)

//   // Check that user exists
//   const users = await request.get(`/${baseURL}/api/users`)
//   expect(users.ok()).toBeTruthy()
//   expect(await users.json()).toContainEqual(expect.objectContaining({
//     name: NEW_USER.Name,
//     email: NEW_USER.email,
//   }))
// })

// test('PUT /api/uploadFile', async({ request, baseURL }) => {
//   const data = new FormData()
//   data.append('field', 'my value')
//   data.append('file', fs.createReadStream('/pictures/avatar.png'))

//   const putRequest = await request.put(`${baseURL}/api/uploadFile`, {
//     data
//   })
//   console.log(await putRequest.json())
//   expect(putRequest.ok()).toBeTruthy()
//   //   expect(postRequest.status()).toBe(201)
  
//   // Check that file exists in DO
//   // Check that response includes { link: String }
// })


// test('PUT /api/createArtistLinks', async({ request, baseURL }) => {
//   const putRequest = await request.put(`${baseURL}/api/createArtistLinks`, {
//     data: {
//       artistHandle: NEW_USER.Handle,
//       works: [{
//         link: 'real link?'
//       }]
//     }
//   })
//   console.log(await putRequest.json())
//   expect(putRequest.ok()).toBeTruthy()
//   //   expect(postRequest.status()).toBe(201)
    
//   // Check that works exist on Artist
// })


// test.afterAll(async ({ request }) => {
//   const deleteUser = prisma.user.delete({
//     where: {
//       email: NEW_USER.email,
//     },
//   })
// })