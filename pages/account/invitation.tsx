import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

type Props = {}

async function getInvite(name: string) {
  try {
    const EXAMPLE_PAYLOAD = {
      'invites': {
        'limit': 3,
        'remaining': 2
      },
      'url': 'outputfield.com/applications?i=1abc-123'
    }
    //   const res = await fetch('/api/signUp', {
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
      <h1 className='glow-black text-[40px] ml-2'>
        Invitation
      </h1>
      <p data-testid="invitation-remaining">
        {invitesRemaining && `You have ${invitesRemaining} invites remaining.`}
      </p>
      
      {url && (
        <div className={`
        border
        border-grey
        rounded-full
    `}
        onClick={() => copyToClipBoard(url)}
        >
          <input
            readOnly
            aria-label="invitation-link"
            id="invitation-link" 
            value={url}
          />
          <span className="cursor-pointer" id="copy">
            copy
          </span>
        </div>
      )}
      {/* after copying see the message here */}
      {copySuccess}
    </Layout>
  )
}

export default Invitation