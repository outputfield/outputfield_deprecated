import React, { useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '../../../components/button/button.component'
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useUser } from '../../../lib/useUser'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// TODO: replace querystring usage with URLSearchParams API
import { ParsedUrlQuery } from 'querystring'
import { getArtistsWithUserAndWorkAndLinks } from '../../api/artists'

const TOPICS = ['Collab', 'Business', 'Other']

export const getStaticPaths = async () => {
  const data = await getArtistsWithUserAndWorkAndLinks()
  const paths = data.map((artist) => {
    return {
      params: { name: artist.handle },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  name: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { name } = context.params as IParams
  const res = await prisma.artist.findUnique({
    where: {
      handle: name,
    },
    include: {
      user: true
    },
  })
  const artistdata = JSON.parse(JSON.stringify(res))
  return {
    props: {
      artistdata,
    },
  }
}

const Contact = ({ artistdata }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm()
  const [topic, setTopic] = useState(null)
  const router = useRouter()
  const user = useUser()

  function selectTopic(event: any) {
    const { value } = event.target
    setTopic(value)
    clearErrors()
  }

  function messageClick() {
    if (topic === null) {
      setError('topic', { type: 'manual', message: 'Select a topic' })
      document?.querySelector('#messageWrap')?.removeAttribute('onClick')
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    trigger()
    const { email: senderEmail } = user
    const { name: recipientName, email: recipientEmail, title, mediums } = artistdata
    const { subject, message } = data

    const senderName = 'Buddy'  // TODO: grab sender's name inside of this component...

    const body = {
      recipientName,
      recipientEmail,
      senderName,
      topic,
      subject,
      title,
      location,
      mediums,
      message,
      senderEmail,
    }
    console.log('submitting email body to api/email/artist... ', body)
    await fetch('/api/email/artist', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  const onError:SubmitErrorHandler<FieldErrors> = (errors, e) => console.log(errors, e)

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={'bg-white w-full h-full pt-0 px-6 pb-16'}>
      <button
        className="flex items-center space-x-2 my-4"
        onClick={() => router.back()}>
        {/* TODO: Replace backArrow with svg for better resolution */}
        <span><img src="/backArrow.png" /></span>
        <span>Back to artist info</span>
      </button>
      <div className="block pt-5 px-3 pb-3">Select a message topic:</div>
      <div
        id="topicSelector"
        className={'relative flex flex-row text-center py-8 px-4 mx-auto border-box'}>
        {TOPICS.map((t) => (

          <button
            key={t}
            value={t}
            className={`px-3 py-1 mx-2 border rounded-full basis-1/${TOPICS.length} ${
              t === topic ? 'border-blue' : 'border-black'
            }`}
            onClick={selectTopic}>
            {t}
          </button>

        ))}
        {/* {Array(TOPICS.length).fill(1).map((a,key) => (
          <div key={key} className={`basis-1/${TOPICS.length} border border-black`}>{key}</div>
        ))} */}
      </div>

      <div id="messageWrap" className="m-6" onClick={messageClick}>
        <input
          className={`border-box rounded-none border border-solid ${
            getFieldState('message').invalid ? 'border-red' : 'border-black'
          }  w-full outline-0 placeholder:text-slate-400 disabled:text-slate-300 disabled:placeholder:text-slate-300 px-3 py-3.5`}
          type="text"
          placeholder="Subject"
          id="contactSubject"
          autoComplete="off"
          {...register('subject', {
            required: 'SUBJECT REQUIRED',
            disabled: topic === null,
          })}
        />
        <div className="h-6 border-x border-dashed border-black" />
        <textarea
          className={`text-black border-box rounded-none border border-solid ${
            getFieldState('message').invalid ? 'border-red-500' : 'border-black'
          } outline-none w-full placeholder:text-slate-400 readOnly:text-slate-300 p-4 min-h-80 align-top resize-y leading-9 whitespace-normal overflow-auto`}
          placeholder="Message"
          id="contactMessage"
          {...register('message', {
            required: 'MESSAGE REQUIRED',
            disabled: topic === null,
          })}
        />
      </div>
      <div className="text-center text-red h-7 mb-6">
        <ErrorMessage errors={errors} name="topic" as="p" />
        <ErrorMessage errors={errors} name="subject" as="p" />
        <ErrorMessage errors={errors} name="message" as="p" />
      </div>
      <Button className="mb-8 w-7/12 text-lg" buttonType="submit">contact</Button>
    </form>
  )
}

export default Contact
