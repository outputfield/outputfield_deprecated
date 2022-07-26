import React, { useCallback, useReducer } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import Input from './input'
import { Button } from './button/button.component'
import DropzoneComponent from './dropzoneComponent'

type ProfileLink = {
  url: string;
  label: string;
};

type ISignUpInputs = {
  Name: string;
  Title: string;
  Pronouns: string;
  Location: string;
  links: ProfileLink[];
};

interface Props {
  onSubmit: (data: ISignUpInputs, files: File[]) => void;
  isSubmitting: boolean;
  profile?: ISignUpInputs | undefined;
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

  const [state, dispatch] = useReducer(
    (state: FilesState, action: FilesAction) => {
      const _state = {...state}
      switch(action.type) {
      case 'UPDATE':
        return { ..._state, [action.key]: action.file }
      }
    },
    {} // TODO: reduce existing files into {}
  )

  const onFormSubmit: SubmitHandler<ISignUpInputs> = (data, event) => {
    event?.preventDefault()
    onSubmit(data, Object.values(state))
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Input
            label="Name"
            placeholder="Enter your name"
            required
            {...register('Name', {required: true})}
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
            placeholder="ie. suavepainter"
            {...register('Title')}
          />
        </div>
        <div className="w-full px-3">
          <Input
            label="Pronouns"
            placeholder="ie. they/them"
            {...register('Pronouns')}
          />
        </div>
        <div className="w-full px-3">
          <Input
            label="Location"
            placeholder="ie. Berlin, Shanghai, etc."
            {...register('Location')}
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
            {Array.from(Array(6)).map((undef, key) => (
              <div key={key} className={`cols-span-${key}`}>
                <button
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-dashed rounded-full p-10 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id={`grid-upload-work-${key}`}
                  onClick={() => console.log('redirect to /upload')}>
                  {/* https://stackoverflow.com/a/47465615 */}
                  {/* https://carterbancroft.com/uploading-directly-to-digital-ocean-spaces-from-your-dang-browser/ */}
                  <DropzoneComponent handleDrop={(file: File) => dispatch({ type: 'UPDATE', key, file})} />
                </button>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`grid-upload-work-${key}`}>
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button role="submit" disabled={isSubmitting}>
        Save Changes
      </Button>
    </form>
  )
}
