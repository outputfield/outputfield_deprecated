import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import Divider from '../../components/dashedDivider'
import { useRouter } from 'next/router'

type Props = {
  invites: any,
  url: string,
}

async function getInvite(name?: string) {
  try {
    const EXAMPLE_PAYLOAD = {
      'invites': {
        'limit': 3,
        'remaining': 2
      },
      'url': 'outputfield.com/applications?i=1abc-123'
    }
    //   const res = await fetch('/api/invitations', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   payload = await res.json()
    return EXAMPLE_PAYLOAD
  } catch (err) {
    throw new Error(`Failed to /signUp: ${err}`)
  }
}

interface IParams extends ParsedUrlQuery {
    name: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
//   const { name } = context.params as IParams

  const { invites, url } = await getInvite()
  //   const { invites, url } = JSON.parse(JSON.stringify(res))
  return {
    props: {
      invites, url
    },
  }
}

const Invitation: React.FC<Props> = ({ invites, url }) => {
  const [invitationLink, setInvitationLink] = useState('')
  const [invitesRemaining, setInvitesRemaining] = useState('')
  const [copySuccess, setCopySuccess] = useState('')
  const router = useRouter()

  
  //   const generateInvitationLink = async (event: BaseSyntheticEvent) => {
  //     event.preventDefault()
  //     try {
  //       const { invites: { limit, remaining } , url } = await generateInvite()
  //       setInvitationLink(url)
  //       setInvitesRemaining(`${remaining}/${limit}`)

  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  useEffect(() => {
    setInvitesRemaining(`${invites.remaining}/${invites.limit}`)
  }, [invites])

  useEffect(() => {
    setInvitationLink(url)
  }, [url])
  
  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      setCopySuccess('Copied!')
    } catch (err) {
      setCopySuccess('Failed to copy!')
    }
  }
  
  return (
    <Layout>
      <Head>
        <title>My Account | Output Field</title>
      </Head>
      <div className="p-4">
        <button onClick={() => router.back()}>
          <Image src='/backArrowLg.svg' width='38' height='6' alt='back' /></button>
        <h1 className={`
        text-xl 
        glow-black 
        ml-2
        mt-12 
        `}>
        Nominate an Artist
        </h1>
      </div>
      <Divider />
      <div className="p-4">

        <div className='flex items-start'>
          <Image
            src="/fourpointstar.svg"
            alt="star"
            width="16"
            height="16"
            className='m-1'
          />
          <h2 className='text-lg w-3/5'>
        Who would you like to join Output Field?
          </h2>
        </div>
      
        {url && (
          <div
            className={`
              text-base
              border
              rounded-full
              my-12
              py-3
              px-6
              bg-blue
            `}
            onClick={() => copyToClipBoard(url)}
          >
            <span className="flex">
              <input
                readOnly
                aria-label="invitation-link"
                id="invitation-link" 
                value={url}
                className={`
                  h-12
                  grow
                  rounded
                  px-2
                  py-3
                  overflow-auto
                  link__linear-gradient
                  drop-shadow-sm
                  ring-0
                `}
              />
              <button
                id="copy"
                className={`
                cursor-pointer 
                rounded
                drop-shadow-sm 
                text-shadow-lg
                shadow-highlight-glow
                bg-black 
                text-white
                uppercase 
                p-2 
                ml-2 
                h-12
              `}
              >
            copy
              </button>
            </span>
            
          </div>
        )}

        {/* after copying see the message here */}
        {copySuccess}

        <p data-testid="invitation-remaining" className='px-6'>
          {invitesRemaining && (
            <>
            Please note, you have only have <span className='text-blue font-bold underline underline-offset-2'>{`${invitesRemaining}`}</span> referrals left. <a className='text-blue hover:underline'>View referral history.</a>
            </>
          )}
        </p>
      </div>

    </Layout>
  )
}

export default Invitation