import React, { useReducer, useState, BaseSyntheticEvent } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import Image from 'next/legacy/image'
import { ErrorMessage } from '@hookform/error-message'

import TabView from '../tabView/tabView.component'
import FormInput from '../formInput'
import { Button } from '../Button'
import EmbedPanel from './embedPanel'
import UploadPanel from './uploadPanel'
import Spinner from '../spinner'
import MediumsCombobox, { MediumOptionT } from './MediumsCombobox'

type ProfileLink = {
  url: string;
  title: string;
};

export type ISignUpInputs = {
  name: string;
  title: string;
  handle: string;
  bio: string;
  mediums: MediumOptionT[];
  mediumsOfInterest: MediumOptionT[];
  pronouns: string;
  location: string;
  links: ProfileLink[];
  email: string;
};

type ISignUpInputsAndWorks = ISignUpInputs & { works: FormData[] }

interface Props {
  onSubmit: (e: React.BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => Promise<void>;
  isSubmitting: boolean;
  profileData?: ISignUpInputsAndWorks | undefined;
}

type UploadWorksAction = {
  type: 'UPDATE',
  key: number,
  work: FormData
}

interface UploadWorksState {
  [x: number]: FormData;
}

export default function ProfileForm({ onSubmit, isSubmitting, profileData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<ISignUpInputs>({
    defaultValues: profileData
  })
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control,
    rules: {
      required: true,
    }
  })

  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadNum, setUploadNum] = useState(-1)
  const closeUpload = () => setUploadOpen(false)

  function init(works: FormData[]) {
    return works.reduce(
      (acc: UploadWorksState, curr: FormData, index: number) => {
        return { [index]: curr, ...acc }
      }, {}
    )
  }

  const [state, dispatch] = useReducer(
    (state: UploadWorksState, action: UploadWorksAction): UploadWorksState => {
      const _state = { ...state }
      switch (action.type) {
      case 'UPDATE':
        return { ..._state, [action.key]: action.work }
      }
    },
    profileData?.works || [],
    init
  )
  console.log('profileForm state', state)

  const handleUploadWork = (uploadNum: number) => (file: FormData) => {
    console.log('uploadFileCallback', uploadNum, file)
    dispatch({ type: 'UPDATE', key: uploadNum, work: file })
    closeUpload()
  }

  const handleEmbedWork = (work: FormData) => {
    dispatch({ type: 'UPDATE', key: uploadNum, work })
    closeUpload()
  }

  const setUploadDialogOpen = (key: number) => (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setUploadNum(key)
    setUploadOpen(true)
  }

  console.log(errors)

  return (
    <>
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
      
      <form
        onSubmit={handleSubmit(
          ((data: ISignUpInputs, e: BaseSyntheticEvent) => onSubmit(e, data, Object.values(state))) as SubmitHandler<ISignUpInputs>)}
        className="w-full max-w-lg my-8"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
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
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              errors={errors}
              name="title"
              label="Title"
              placeholder="Witch Gambler"
              required
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="handle"
              label="Handle"
              placeholder="ie. suavepainter"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              errors={errors}
              name="pronouns"
              label="Pronouns"
              placeholder="ie. they/them"
              required
              icon
            />
            
          </div>
          <div className="w-full px-3">
            {/* TODO: dynamically fetch mediums options */}
            <MediumsCombobox
              name="mediums"
              label="Mediums"
              options={[
                {
                  id: 1,
                  label: 'wood'
                }, {
                  id: 2, 
                  label: 'metal'
                }, {
                  id: 3, 
                  label: 'sculpture'
                }
              ]}
              selectedMediums={watch('mediums') || []}
              setSelectedMediums={(values) => setValue('mediums', values)}
            />
          </div>
          <div className="w-full px-3">
            {/* TODO: dynamically fetch mediums options */}
            <MediumsCombobox
              name="mediumsOfInterest"
              label="Mediums of Interest"
              options={[
                {
                  id: 1,
                  label: 'wood'
                }, {
                  id: 2, 
                  label: 'metal'
                }, {
                  id: 3, 
                  label: 'sculpture'
                }
              ]}
              selectedMediums={watch('mediumsOfInterest') || []}
              setSelectedMediums={(values) => setValue('mediumsOfInterest', values)}
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              errors={errors}
              name="location"
              label="Location"
              placeholder="ie. Berlin, Shanghai, etc."
              required
              icon
            />
            
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="bio"
              label="Bio"
              placeholder="Tell us something about yourself."
              as='textarea'
              icon
            />
          </div>
        </div>

        <div className="flex flex-col mx-3 mb-2">
          <h2 className='text-lg ml-2 my-6 glow-black'>Add Links</h2>
          <ErrorMessage
            errors={errors}
            name='links'
            message='Please add at least one personal link.'
            render={({message}) => (
              <p className=' text-gray-dark text-base mb-2'>{message}</p>
            )}
          />
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border-long-dashed">
            {fields.map((field, index) => (
              <div className="py-6 grid grid-cols-2 grid-flow-cols justify-items-stretch items-center" key={field.id}>
                <div className='col-start-1 col-end-3'>
                  <FormInput
                    register={register}
                    errors={errors}
                    name={`links.${index}.url`}
                    placeholder="Enter your website"
                    required
                    innerShadow
                  />
                </div>
                <div className='cols-span-1'>
                  <FormInput
                    register={register}
                    errors={errors}
                    name={`links.${index}.title`}
                    placeholder="Label"
                    required
                  />
                </div>
                <div className='cols-span-1 justify-self-end'>
                  <button
                    className="uppercase"
                    onClick={(e) => {
                      e.preventDefault()
                      remove(index)}
                    }>
                    <Image src="/removeIcon.svg" alt="-" height={13} width={13} /> Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="uppercase"
              onClick={(e) => {
                e.preventDefault()
                append({ url: '', title: '' }, { shouldFocus: true })
              }
              }>
              <Image src="/addIcon.svg" alt="+" height={13} width={13} /> Add
            </button>
          </div>
        </div>

        <div className="flex flex-col mx-3 mb-2">
          <h2 className='text-lg ml-2 my-6 glow-black'>Upload Work</h2>
          {Object.values(state).length === 0 && (
            <p className='text-gray-dark text-base mb-2'>Please add at least one work.</p>
          )}
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border-long-dashed">
            <div className="py-6 grid grid-cols-2 gap-20 justify-items-center">
              {[0,1,2,3,4,5].map((key) => {
                const displayKey = key + 1
                return (
                  <span key={displayKey} className={`cols-span-${displayKey} `}>
                    <button
                      className={`
                        appearance-none
                        leading-none
                        w-fit
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
                      {state[key] ? 'file here!' : (
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
        <Button type="submit" loading={isSubmitting}>Save</Button>
        <div className="text-center py-4">
          {isSubmitting && <Spinner />}
          {isSubmitted && !isValid && <p className='text-error-red'>Please correct the errors above.</p>}
        </div>
      </form>
    </>
  )
}
