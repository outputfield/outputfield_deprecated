import React, { useMemo, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '../../../components/Button'
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useUser } from '../../../lib/useUser'
import { ArtistWithUserAndNominatedByAndWorkAndLinks } from '../../api/artists/[name]'

// eslint-disable-next-line no-useless-escape
const RE_EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const TOPICS = [
  {
    label: 'Collab',
    text: '',
    authenticated: true,
  },
  {
    label: 'Business',
    text: '',
    authenticated: true,
  },
  {
    label: 'Other',
    text: '',
    authenticated: true,
  },
  {
    label: 'Invite',
    text: '',
    authenticated: false,
  },
  {
    label: 'Commission',
    text: '',
    authenticated: false,
  },
  {
    label: 'Inquiry',
    text: '',
    authenticated: false,
  },
]

// export const getStaticPaths = async () => {
//   const data = await getArtistsWithUserAndWorkAndLinks()
//   const paths = data.map((artist) => {
//     return {
//       params: { name: artist.handle },
//     }
//   })
//   return {
//     paths,
//     fallback: false,
//   }
// }

// interface IParams extends ParsedUrlQuery {
//   name: string
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const { name } = context.params as IParams
//   const res = await prisma.artist.findUnique({
//     where: {
//       handle: name,
//     },
//     include: {
//       user: true
//     },
//   })
//   const artistData = JSON.parse(JSON.stringify(res))
//   return {
//     props: {
//       artistData,
//     },
//   }
// }

interface Props {
  artistData: ArtistWithUserAndNominatedByAndWorkAndLinks,
  onClose: () => void
}

const Contact: React.FC<Props> = ({ artistData, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      topic: '',
      senderEmail: '',
      subject: '',
      message: '',
    }
  })
  const [topic, setTopic] = useState(null)
  const user = useUser()

  function selectTopic(event: any) {
    const { value } = event.target
    setTopic(value)
    clearErrors()

    // TODO: side effect, set message text
    const message = `${'aaa'} Here's their message:
To reply, email them at ${'aaa'}
    `
    setValue('message', message)
  }

  function messageClick() {
    if (topic === null) {
      setError('topic', { type: 'manual', message: 'Select a topic' })
      document?.querySelector('#messageWrap')?.removeAttribute('onClick')
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    trigger()
    // FIXME:
    const { user: { name: recipientName, email: recipientEmail }, title, mediums, location } = artistData
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
      senderEmail: user ? user.email : 'dummy@gmail.com',
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

  const onError: SubmitErrorHandler<FieldErrors> = (errors, e) => console.log(errors, e)

  const RELEVANT_TOPICS = useMemo(() => TOPICS.filter(({ authenticated }) => Boolean(user) === authenticated), [user])
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={'w-full h-full pt-0 focus-within:outline-dotted'}>
      <div className="block pt-5 px-3 pb-3">Select a message topic:</div>
      <div
        id="topicSelector"
        className={'relative flex flex-row text-center py-8 px-4 mx-auto border-box'}>
        {RELEVANT_TOPICS
          .map(({ label }) => (
            <button
              key={label}
              value={label}
              className={`px-3 py-1 mx-2 border rounded-full basis-1/${RELEVANT_TOPICS.length} ${label === topic ? 'border-blue' : 'border-black'
              }`}
              onClick={selectTopic}>
              {label}
            </button>
          ))}
      </div>

      <div id="messageWrap" className="m-4" onClick={messageClick}>
        {Boolean(user) === false && (
          <>
            <input
              className={'border-box rounded-none border border-solid invalid:border-red border-black w-full outline-0 placeholder:text-slate-400 disabled:text-slate-300 disabled:placeholder:text-slate-300 py-3.5 text-base focus:outline-none focus:ring-4'}
              type="text"
              placeholder="Your email address"
              id="contactSubject"
              autoComplete="off"
              {...register('senderEmail', {
                required: 'EMAIL REQUIRED',
                disabled: topic === null,
                pattern: {
                  value: RE_EMAIL_PATTERN,
                  message: 'INVALID EMAIL ADDRESS'
                }
              })}
            />
            <div className="h-6 border-x border-dashed border-black" />
          </>
        )}
        <input
          className={'border-box rounded-none border border-solid invalid:border-red border-black w-full outline-0 placeholder:text-slate-400 disabled:text-slate-300 disabled:placeholder:text-slate-300 px-3 py-3.5 text-base uppercase'}
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
          className={'text-black border-box rounded-none border border-solid invalid:border-red-500 border-black outline-none w-full placeholder:text-slate-400 readOnly:text-slate-300 p-4 min-h-80 align-top resize-y leading-9 whitespace-normal overflow-auto text-base'}
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
        <ErrorMessage errors={errors} name="senderEmail" as="p" />
        <ErrorMessage errors={errors} name="subject" as="p" />
        <ErrorMessage errors={errors} name="message" as="p" />
      </div>
      {/* FIXME: disabled if errors */}
      <Button type="submit" disabled={!isValid}>Send</Button>
      <button
        className="flex items-center space-x-2 my-12 mx-auto uppercase"
        onClick={onClose}>
        <span><img src="/backArrow.svg" /></span>
        <span>Back to artist info</span>
      </button>
    </form>
  )
}

export default Contact
