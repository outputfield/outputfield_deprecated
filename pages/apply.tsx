import React, { useState, BaseSyntheticEvent, useReducer, useMemo } from 'react'
import Head from 'next/head'
import FormInput from '../components/formInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Work } from '../types'
import { removeProperty } from '../lib/utils'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import TabView from '../components/tabView/tabView.component'
import UploadPanel from '../components/ProfileForm/uploadPanel'
import EmbedPanel from '../components/ProfileForm/embedPanel'
import { useRouter } from 'next/router'

export type IApplyInputs = {
  name: string,
  email: string,
  works: Work[]
}

type Add = {
  type: 'ADD',
  key: number,
  work: FormData
}

type Delete = {
  type: 'DELETE',
  key: number,
}

type UploadWorksAction = Add | Delete

interface UploadWorksState {
  [key: number]: FormData;
}

const pendingForms = new WeakMap()

const Application: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IApplyInputs>()
  const [state, dispatch] = useReducer(
    (state: UploadWorksState, action: UploadWorksAction): UploadWorksState => {
      const _state = { ...state }
      switch (action.type) {
      case 'ADD':
        return { ..._state, [action.key]: action.work }
      case 'DELETE':
        return removeProperty(_state, `${action.key}`)
      }
    },
    []
  )
  const filenames = useMemo(() => Object.keys(state).reduce((acc:any, key:any) => {
    const formData = state[key] as FormData
    if (formData) {
      if (formData.get('workType') === 'embeddedWork') {
        const filename = formData.get('title')
        return {...acc, [key]: filename}
      } else if (formData.get('workType') === 'uploadedWork') {
        const file = formData.get('file')
        const filename = file instanceof File ? file.name : ''
        return {...acc, [key]: filename}
      }
    } else {
      return {...acc, [key]: ''}
    }
  }, {}), [state])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadNum, setUploadNum] = useState(-1)
  const closeUpload = () => setUploadOpen(false)

  const handleUploadWork = (uploadNum: number) => (file: FormData) => {
    dispatch({ type: 'ADD', key: uploadNum, work: file })
    closeUpload()
  }

  const handleEmbedWork = (work: FormData) => {
    dispatch({ type: 'ADD', key: uploadNum, work })
    closeUpload()
  }

  const handleDeleteWork = (uploadNum: number) => (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: 'DELETE', key: uploadNum })
  }

  const setUploadDialogOpen = (key: number) => (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setUploadNum(key)
    setUploadOpen(true)
  }

  const [message, setMessage] = useState('')

  const onSubmit = async (event: BaseSyntheticEvent, data: IApplyInputs) => {
    const form = event.target
    const previousController = pendingForms.get(form)

    if (previousController) {
      previousController.abort()
    }

    const controller = new AbortController()

    console.log(form)
    pendingForms.set(form, controller)

    event.preventDefault()
    console.log('apply onSubmit data', data)
    // setIsSubmitting(true)

    try {
      const params = new URLSearchParams(document.location.search)
      const inviterId = params.get('id')

      // set success message
      setMessage('Account successfully created! Redirecting to Login shortly...')
      setTimeout(() => {
        // Finally, redirect to /login, where user will login for the first time
        router.push('/login')
      }, 3000)
    } catch (error) {
      console.error(error)
      setMessage('Sorry, something went wrong.')
    } finally {
      // setIsSubmitting(false)
    }
  }

  return (
    <main role='main'>
      <Head>
        <title>Application | Output Field</title>
      </Head>
      <Dialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center ">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="flex flex-col mx-auto max-w-sm bg-white h-screen min-w-full">
            <div className="h-12 sm:ml-4 flex items-center justify-between relative">
              <button
                className='px-4'
                onClick={(e) => {
                  e.preventDefault()
                  setUploadOpen(false)
                }}
              >
                <Image src="/closeIcon.svg" alt="close" width={16} height={16} />
              </button>
            </div>
            <div className='h-full px-2 py-8 border-long-dashed-t'>
              <TabView headers={['Upload', 'Embed']}>
                <UploadPanel handleUploadWork={handleUploadWork} uploadNum={uploadNum} />
                <EmbedPanel handleEmbedWork={handleEmbedWork} />
              </TabView>
            </div>
            <div className='w-full h-6 border-long-dashed-t absolute bottom-0' />
          </Dialog.Panel>
        </div>
      </Dialog>
      <h1>Apply</h1>
      <form onSubmit={handleSubmit(
          ((data: IApplyInputs, e: BaseSyntheticEvent) => onSubmit(e, data)) as SubmitHandler<IApplyInputs>)
      }>
        <FormInput
          register={register}
          errors={errors}
          name="name"
          label="Name"
          placeholder="Enter your name"
          type="text"
          required
          icon
        />
        <FormInput
          register={register}
          errors={errors}
          name="email"
          label="email"
          placeholder="Enter your email"
          type="text"
          required
          icon
        />
        <div className="flex flex-col mx-3 mb-2">
          <h2 className='text-lg ml-2 my-6 glow-black'>Upload Work</h2>
          {/* TODO: try to separate WorkUpload into a different component? */}
          {Object.values(state).length < 3 && (
            <p className='text-gray-dark text-base mb-2'>Please add at least three works.</p>
          )}
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border-long-dashed">
            <div className="py-6 grid grid-cols-2 gap-20 justify-items-center">
              {[0,1,2].map((key) => {
                const displayKey = key + 1
                return (
                  <span key={displayKey} className={`cols-span-${displayKey} `}>
                    <button
                      className={`
                        relative
                        inline-block
                        appearance-none
                        leading-none
                        w-28
                        h-28
                        text-gray-700
                        border
                        border-black
                        border-dashed
                        rounded-full
                        p-8
                        mb-1
                        focus:outline-none
                        focus:bg-white
                        add-button__radial-gradient
                      `}
                      id={`grid-upload-work-${displayKey}`}
                      onClick={setUploadDialogOpen(key)}>
                      {state[key] ? (
                        <>
                          <p className={`
                          absolute
                          -left-4
                          top-12
                          w-36
                          p-0.5
                          border
                          border-black
                          bg-white
                          truncate
                          text-sm
                          `}>
                            {filenames[key]}
                          </p>
                          <a
                            onClick={handleDeleteWork(key)}
                            className={`
                              absolute
                              top-0
                              right-0
                            `}
                          >
                            <Image src='/trashIcon.svg' alt='x' height='24' width='24' />
                          </a>
                        </>
                      ) : (
                        <Image
                          src="/plusLg.svg"
                          alt='+'
                          width="36"
                          height="36"
                          className='add-button__drop-shadow'
                        />
                      )}
                    </button>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs text-center mb-2"
                      htmlFor={`grid-upload-work-${displayKey}`}>
                      {displayKey}
                    </label>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
        <button type='submit'>SUBMIT</button>
      </form>
      {message}
    </main>
  )
}

export default Application