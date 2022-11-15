import React, { useCallback, useReducer, useState, BaseSyntheticEvent } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import Input from './input'
import { Button } from './button/button.component'
import DropzoneComponent from './dropzoneComponent'
import Overlay from './overlay'
import TabView from './tabView/tabView.component'

type ProfileLink = {
  url: string;
  label: string;
};

export type ISignUpInputs = {
  Name: string;
  Title: string;
  Pronouns: string;
  Location: string;
  links: ProfileLink[];
};

interface Props {
  onSubmit: (e: React.BaseSyntheticEvent, data: ISignUpInputs, files: File[]) => void;
  isSubmitting: boolean;
  profile?: ISignUpInputs;
}

type File = {
  type: string,
  name: string
}

type FilesAction = {
  type: 'UPDATE',
  key: number,
  file: File
}

interface FilesState {
  [x: number]: File;
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
    (state: FilesState, action: FilesAction) => {
      const _state = { ...state }
      switch (action.type) {
      case 'UPDATE':
        return { ..._state, [action.key]: action.file }
      }
    },
    {} // TODO: reduce existing files into {}
  )

  const uploadFileCallback = (uploadNum: number) => (file: File) => {
    console.log('uploadFileCallback', uploadNum, file)
    dispatch({ type: 'UPDATE', key: uploadNum, file })
    closeUpload()
  }
  console.log('state', state)

  const MemoDropzoneComponent = React.memo(({ uploadNum }: DropzoneProps) => {
    console.log(`${uploadNum} rendered`)
    return <DropzoneComponent handleDrop={uploadFileCallback(uploadNum)} />
  })
  MemoDropzoneComponent.displayName = 'MemoDropzoneComponent'

  return (
    <>
      <Overlay className={uploadOpen ? 'visible' : 'hidden'}>
        <button onClick={closeUpload}>
          <img src="/closeIcon.svg" alt="close overlay icon" />
        </button>
        <TabView headers={['Upload', 'Embed']}>
          <div className='UploadPanel'>
            uploadNum state: {uploadNum} <br />

            We currently support:
            <br /><br />
            <ul>
              <li>images (jpg, png, gif, tiff)</li>
            </ul>
            <br />
            {/* {FIXME: this is always putting uploaded file in index 0} */}
            {/* <DropzoneComponent handleDrop={uploadFileCallback} /> */}
            <MemoDropzoneComponent uploadNum={uploadNum} />
          </div>
          <div className="EmbedPanel">
            <Input register={register} placeholder="Link Youtuboe, Vime, SoundCloud, etc." label={`links.${uploadNum}.url`} required={false} className={''} />
            <Input register={register} placeholder="label" label={`links.${uploadNum}.label`} required={false} className={''} />
            <Button>Embed</Button>
          </div>
        </TabView>

      </Overlay>
      <form onSubmit={handleSubmit(
        ((data: any, e: BaseSyntheticEvent) => onSubmit(e, data, Object.values(state))) as SubmitHandler<ISignUpInputs>)} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Input
              label="Name"
              register={register}
              placeholder="Enter your name"
              type="text"
              required
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
            <Input
              label="Title"
              register={register}
              placeholder="ie. suavepainter"
              type="text"
            />
          </div>
          <div className="w-full px-3">
            <Input
              label="Pronouns"
              type="text"
              placeholder="ie. they/them"
              register={register}
            />
          </div>
          <div className="w-full px-3">
            <Input
              label="Location"
              type="text"
              placeholder="ie. Berlin, Shanghai, etc."
              register={register}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <h2>++Add Links++</h2>
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
            {fields.map((field, index) => (
              <div className="py-6 grid grid-cols-2" key={field.id}>
                {/* TODO: change these to Input component, add new "noLabel" prop to Input */}
                <input
                  className="appearance-none col-span-2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                  id="grid-website-url"
                  type="text"
                  placeholder="Enter your website"
                  {...register(`links.${index}.url` as const)}
                />
                <input
                  className="appearance-none col-span-1 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-website-label"
                  type="text"
                  placeholder="Label"
                  {...register(`links.${index}.label` as const)}
                />
                <button
                  className="col-span-1 uppercase"
                  onClick={() => remove(index)}>
                  - Remove
                </button>
              </div>
            ))}
            <button
              className="uppercase"
              onClick={() =>
                append({ url: '', label: '' }, { shouldFocus: true })
              }>
              + Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <h2>++Upload Work++</h2>
          <div className="w-full md:w-1/3 px-4 py-6 mb-6 md:mb-0 border border-dashed border-black">
            <div className="py-6 grid grid-cols-2">
              {[0,1,2,3,4,5].map((key) => {
                const displayKey = key + 1
                return (
                  <div key={displayKey} className={`cols-span-${displayKey}`}>
                    <div>{state[key]?.name || ''}</div>
                    <button
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-dashed rounded-full p-10 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id={`grid-upload-work-${displayKey}`}
                      onClick={() => {
                        console.log('setting', key === uploadNum)
                        setUploadNum(key)
                        setUploadOpen(true)
                      }}>
                      +
                    </button>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor={`grid-upload-work-${displayKey}`}>
                      {displayKey}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Button role="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </>

  )
}
