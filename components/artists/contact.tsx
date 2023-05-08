import React, { BaseSyntheticEvent, useMemo, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '../Button'
import { useForm } from 'react-hook-form'
import { useUser } from '../../lib/useUser'
import { ArtistWithInviterAndUserAndLinks } from '../../pages/api/artists/[name]'
import Image from 'next/image'
import FormInput from '../formInput'

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

interface Props {
  artistData: ArtistWithInviterAndUserAndLinks,
  onClose: () => void
}

interface FormValues {
  topic: string,
  senderEmail: string,
  subject: string,
  message: string,
}

const Contact: React.FC<Props> = ({ artistData, onClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
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
  const pendingForms = new WeakMap()

  function selectTopic(event: any) {
    const { value } = event.target
    setTopic(value)
    clearErrors()

    // TODO: side effect, set message text
    //     const message = `${'aaa'} Here's their message:
    // To reply, email them at ${'aaa'}
    //     `
    //     setValue('message', message)
  }

  function messageClick() {
    if (topic === null) {
      setError('topic', { type: 'manual', message: 'Select a topic' })
      document?.querySelector('#messageWrap')?.removeAttribute('onClick')
    }
  }

  const onValid = async (data: FormValues, e?: BaseSyntheticEvent) => {
    trigger()
    try {
      const { senderEmail, subject, message } = data
      const form = e?.currentTarget as EventTarget
      const previousController = pendingForms.get(form)

      if (previousController) {
        previousController.abort()
      }

      const controller = new AbortController()
      pendingForms.set(form, controller)

      const senderName = user.name || 'Anonymous'  // FIXME: grab sender's name inside of this component...

      const body = {
        recipientName: artistData?.user.name,
        recipientEmail: artistData?.user.email,
        senderEmail: user ? user.email : senderEmail,
        senderName,
        topic,
        subject,
        message,
        title: artistData?.title,
        location: artistData?.location,
        mediums: artistData?.mediums,
      }
      console.log('submitting email body to api/email/artist... ', body)
      await fetch('/api/email/artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal
      })
      pendingForms.delete(form)
    } catch (error) {
      console.log('contact onSubmit failed with ', error)
    }
  }

  const onError = (errors: any, e?: BaseSyntheticEvent) => console.log(errors, e)

  const RELEVANT_TOPICS = useMemo(() => TOPICS.filter(({ authenticated }) => Boolean(user) === authenticated), [user])
  
  return (
    <form
      onSubmit={handleSubmit(onValid, onError)}
      className={`
        w-full
        h-full
        pt-0
        text-[12px]
      `}
    >
      <div className="block pt-5 px-3 pb-3">Select a message topic:</div>
      <div
        id="topicSelector"
        className={`
          text-center
          pt-8
          px-3
          mx-auto
          border-box
          grid
          justify-items-center
          grid-cols-3
        `}>
        {RELEVANT_TOPICS
          .map(({ label }) => (
            <div key={label}>
              <button
                value={label}
                className={`
                  uppercase
                  py-2
                  px-4
                  border-2
                  rounded-full
                  ${label === topic ? 'border-blue/80 bg-gray-light' : 'border-black'}
                `}
                onClick={selectTopic}
              >
                {label}
              </button>
            </div>
          ))}
        {RELEVANT_TOPICS.map(({ label }) => (
          <div key={label} className={`w-0 h-8 ${label === topic && 'border border-blue'}`} />
        ))}
      </div>

      <div id="messageWrap" className="mx-4" onClick={messageClick}>
        {Boolean(user) === false && (
          <>
            <label htmlFor='senderEmail'>Email</label>
            <input
              className={`
                border-box
                rounded-none
                border
                border-solid
                invalid:border-red
                border-black
                w-full
                outline-0
                placeholder:text-slate-400
                disabled:text-slate-300
                disabled:placeholder:text-slate-300
                py-4
                px-3
                text-base
                focus:outline-none
                focus:glow-blue
              `}
              type="text"
              placeholder="yourpersonal@email.com"
              id="senderEmail"
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
          </>
        )}
        <label htmlFor='subject'>Subject</label>
        <input
          className={`
            border-box
            rounded-none
            border
            border-solid
            invalid:border-red
            border-black
            w-full
            outline-0
            placeholder:text-slate-400
            disabled:text-slate-300
            disabled:placeholder:text-slate-300
            py-4
            px-3
            text-base
            uppercase
            focus:outline-none
            focus:glow-blue
          `}
          type="text"
          placeholder="Subject"
          id="subject"
          autoComplete="off"
          {...register('subject', {
            required: 'SUBJECT REQUIRED',
            disabled: topic === null,
          })}
        />
        <label htmlFor='message'>Message</label>
        <textarea
          className={`
            text-black
            border-box
            rounded-none
            border
            border-solid
            invalid:border-red-500
            border-black
            outline-none
            w-full
            placeholder:text-slate-400
            readOnly:text-slate-300
            py-4
            px-3
            min-h-80
            align-top
            resize-y
            leading-7
            whitespace-normal
            overflow-auto
            text-base
            focus:outline-none
            focus:glow-blue
          `}
          placeholder="Message"
          id="Message"
          {...register('message', {
            required: 'MESSAGE REQUIRED',
            disabled: topic === null,
          })}
        />
      </div>
      <div className="text-center text-red h-7 my-6">
        <ErrorMessage errors={errors} name="topic" as="p" />
        <ErrorMessage errors={errors} name="senderEmail" as="p" />
        <ErrorMessage errors={errors} name="subject" as="p" />
        <ErrorMessage errors={errors} name="message" as="p" />
      </div>
      <Button type="submit" disabled={!isValid}>Send</Button>
      <button
        className="flex items-center space-x-2 my-12 mx-auto uppercase"
        onClick={onClose}>
        <span><Image src="/backArrow.svg" alt='back arrow' width={44} height={1}/></span>
        <span>Back to artist info</span>
      </button>
    </form>
  )
}

export default Contact
