import React, { useReducer, useState, BaseSyntheticEvent } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import Image from 'next/legacy/image'
import { ErrorMessage } from '@hookform/error-message'

import TabView from '../tabView/tabView.component'
import FormInput from '../formInput'
import { Button } from '../Button'
import EmbedPanel from './embedPanel'
import UploadPanel from './uploadPanel'
import Spinner from '../spinner'
import { makeid } from '../../lib/utils'

type MediumOption = {
  id: number,
  label: string
}
// TODO: separate component
type MediumsComboboxProps = {
  name: string,
  label: string,
  options: MediumOption[],
  selectedMediums: MediumOption[],
  setSelectedMediums: (mediums: MediumOption[]) => void,
}

function MediumsCombobox({
  name,
  label,
  options,
  selectedMediums,
  setSelectedMediums
}: MediumsComboboxProps) {
  const [query, setQuery] = useState('')
  const filteredOptions =
    query === ''
      ? options
      : options.filter((medium) => {
        return medium.label.toLowerCase().includes(query.toLowerCase())
      })
  return (
    <Combobox
      multiple
      nullable
      value={selectedMediums}
      onChange={setSelectedMediums}
      name={name}
    >
      <Combobox.Label>{label}</Combobox.Label>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left border border-color-[#D5D8DC] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <div>
            {selectedMediums.map((medium) => (
              <span
                key={medium.id}
                className={'border border-black rounded-sm ml-1 p-1'}
              >
                {medium.label}
                <button
                  onClick={() => setSelectedMediums(selectedMediums.filter(({ id }) => id !== medium.id))}
                  className='font-gray ml-1'>
                    x
                </button>
              </span>
            ))}
          </div>
            
          <Combobox.Button as='div' className="flex items-center">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="--Select--"
              onChange={(event) => {
                const value = event.target.value.includes(',') ? event.target.value.split(selectedMediums.join(','))[1] : event.target.value
                setQuery(value)
              }}
              value={query}
            />
            <span className="absolute right-2">
                downarrow
            </span>
          </Combobox.Button>
        </div>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      ></Transition>
      <Combobox.Options
        className={`
          absolute
          ring-1
          border
          border-purple
          w-full
          bg-white
          z-50
          cursor-pointer
        `}
      >
        {query.length > 0 && !selectedMediums.filter(({ label }) => label === query).length && (
          <Combobox.Option value={{ id: makeid(3), label: query}} onClick={() => setQuery('')}> 
            + Add &quot;{query}&quot;
          </Combobox.Option>
        )}
        {filteredOptions.map((medium) => (
          <Combobox.Option
            key={medium.id}
            value={medium}
            disabled={selectedMediums.filter(({ label }) => label === medium.label).length !== 0}
            // className=""
          >
            {({ active, selected, disabled }) => (
              <div className={`cursor-pointer ${disabled && 'cursor-not-allowed bg-orange'} ${active && 'bg-blue'} ${selected && 'bg-pink'}`}>{medium.label}</div>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

type ProfileLink = {
  url: string;
  title: string;
};

export type ISignUpInputs = {
  name: string;
  title: string;
  handle: string;
  bio: string;
  mediums: MediumOption[];
  mediumsOfInterest: MediumOption[];
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
          <Dialog.Panel className="mx-auto max-w-sm bg-white h-screen min-w-full">
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
            <div className='px-2 py-8 border-t border-black border-dashed'>
              <TabView headers={['Upload', 'Embed']}>
                <UploadPanel handleUploadWork={handleUploadWork} uploadNum={uploadNum} />
                <EmbedPanel handleEmbedWork={handleEmbedWork} />
              </TabView>
            </div>
            <div className='w-full h-6 border-t border-dashed absolute bottom-0' />
          </Dialog.Panel>
        </div>
      </Dialog>
      
      <form
        onSubmit={handleSubmit(
          ((data: ISignUpInputs, e: BaseSyntheticEvent) => onSubmit(e, data, Object.values(state))) as SubmitHandler<ISignUpInputs>)}
        className="w-full max-w-lg my-8"
      >
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
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
            {/* <FormInput
              register={register}
              name="mediums"
              label="Mediums"
              placeholder="wood, sound"
              icon
            /> */}
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
            {/* <FormInput
              register={register}
              name="mediumsOfInterest"
              label="Mediums of Interest"
              placeholder="graphite, metal sculpture"
              icon
            /> */}
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
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
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
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
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
