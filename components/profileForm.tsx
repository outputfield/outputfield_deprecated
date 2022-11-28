import React, { useCallback, useReducer, useState, BaseSyntheticEvent } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import FormInput from './formInput'
import { Button } from './button/button.component'
import DropzoneComponent from './dropzoneComponent'
import TabView from './tabView/tabView.component'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'

type ProfileLink = {
  url: string;
  label: string;
};

export type ISignUpInputs = {
  Name: string;
  Title: string;
  Handle: string;
  Bio: string;
  Mediums: string[];
  'Mediums of Interest': string[];
  Pronouns: string;
  Location: string;
  links: ProfileLink[];
};

interface Props {
  onSubmit: (e: React.BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => Promise<void>;
  isSubmitting: boolean;
  profile?: ISignUpInputs | undefined;
}

type FilesAction = {
  type: 'UPDATE',
  key: number,
  file: FormData
}

interface FilesState {
  [x: number]: FormData;
}

interface DropzoneProps {
  uploadNum: number,
}

export default function ProfileForm({ onSubmit, isSubmitting, profile }: Props) {
  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm<ISignUpInputs>()
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control,
  })
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadNum, setUploadNum] = useState(-1)
  const closeUpload = () => setUploadOpen(false)

  const [state, dispatch] = useReducer(
    (state: FilesState, action: FilesAction): FilesState => {
      const _state = { ...state }
      switch (action.type) {
      case 'UPDATE':
        return { ..._state, [action.key]: action.file }
      }
    },
    {} // TODO: reduce existing files into {} as initialState
  )
  console.log('profileForm state', state)

  const uploadFileCallback = (uploadNum: number) => (file: FormData) => {
    console.log('uploadFileCallback', uploadNum, file)
    dispatch({ type: 'UPDATE', key: uploadNum, file })
    closeUpload()
  }

  const MemoDropzoneComponent = React.memo(({ uploadNum }: DropzoneProps) => {
    return <DropzoneComponent handleDrop={uploadFileCallback(uploadNum)} />
  })
  MemoDropzoneComponent.displayName = 'MemoDropzoneComponent'

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
          <Dialog.Panel className="mx-auto max-w-sm bg-white min-h-screen min-w-full">
            <div className="mt-2 sm:ml-4 flex justify-between px-4 pb-4">
              <button onClick={(e) => {
                e.preventDefault()
                setUploadOpen(false)
              }}>
                <Image src="/closeIcon.svg" alt="close" width={16} height={16} />
              </button>
            </div>
            <div className='mb-4 px-5 py-8 border-y border-black border-dashed h-full'>
              <TabView headers={['Upload', 'Embed']}>
                <div className="text-center">
                   We currently support:
                  <br /><br />
                  <ul>
                    <li>images (jpg, png, gif, tiff)</li>
                  </ul>
                  <br />
                  <MemoDropzoneComponent uploadNum={uploadNum} />
                </div>
                <div className="text-center">
                  <FormInput register={register} placeholder="Link Youtuboe, Vime, SoundCloud, etc." name={`links.${uploadNum}.url`} />
                  <FormInput register={register} placeholder="label" name={`links.${uploadNum}.label`} />
                  <Button>Embed</Button>
                </div>
              </TabView>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      
      <form onSubmit={handleSubmit(
        ((data: any, e: BaseSyntheticEvent) => onSubmit(e, data, Object.values(state))) as SubmitHandler<ISignUpInputs>)} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              register={register}
              name="Name"
              label="Name"
              placeholder="Enter your name"
              type="text"
              required
              icon
            />
            {errors['Name'] && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Title"
              label="Title"
              placeholder="Witch Gambler"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Handle"
              label="Handle"
              placeholder="ie. suavepainter"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Pronouns"
              label="Pronouns"
              placeholder="ie. they/them"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Mediums"
              label="Mediums"
              placeholder="wood, sound"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Mediums of Interest"
              label="Mediums of Interest"
              placeholder="graphite, metal sculpture"
              icon
            />
          </div>
          <div className="w-full px-3">
            <FormInput
              register={register}
              name="Location"
              label="Location"
              placeholder="ie. Berlin, Shanghai, etc."
              icon
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <h2>Add Links</h2>
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
            {fields.map((field, index) => (
              <div className="py-6 grid grid-cols-2 grid-flow-cols justify-items-stretch items-center" key={field.id}>
                <div className='col-start-1 col-end-3'>
                  <FormInput
                    register={register}
                    name={`links.${index}.url`}
                    placeholder="Enter your website"
                  />
                </div>
                <div className='cols-span-1'>
                  <FormInput
                    register={register}
                    name={`links.${index}.label`}
                    placeholder="Label"
                  />
                </div>
                <div className='cols-span-1 justify-self-end'>
                  <button
                    className="uppercase"
                    onClick={(e) => {
                      e.preventDefault()
                      remove(index)}
                    }>
                  - Remove
                  </button>
                </div>
                
                

              </div>
            ))}
            <button
              className="uppercase"
              onClick={(e) => {
                e.preventDefault()
                append({ url: '', label: '' }, { shouldFocus: true })
              }
              }>
              + Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <h2>Upload Work</h2>
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
            <div className="py-6 grid grid-cols-2 justify-items-center">
              {[0,1,2,3,4,5].map((key) => {
                const displayKey = key + 1
                return (
                  <div key={displayKey} className={`cols-span-${displayKey} `}>
                    <button
                      className="appearance-none block w-10 h-10 text-gray-700 border border-black border-dashed rounded-full p-8 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id={`grid-upload-work-${displayKey}`}
                      onClick={(e: BaseSyntheticEvent) => {
                        // TODO: extract this function
                        e.preventDefault()
                        setUploadNum(key)
                        setUploadOpen(true)
                      }}>
                      <div>{state[key] ? 'file here!' : '+'}</div>
                    </button>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs text-center mb-2"
                      htmlFor={`grid-upload-work-${displayKey}`}>
                      {displayKey}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Button role="submit" loading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </>
  )
}
