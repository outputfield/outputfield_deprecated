import React, { BaseSyntheticEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import { Button } from '../Button'

type EmbedPanelProps = {
  handleEmbedWork: (work: FormData) => void
};

type EmbeddedWork = {
  title: string,
  url: string,
}

export default function EmbedPanel({
  handleEmbedWork
}: EmbedPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmbeddedWork>()
  const onSubmit = (data: EmbeddedWork, e: BaseSyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('workType', 'embeddedWork')
    formData.append('url', data.url)
    formData.append('title', data.title)
    handleEmbedWork(formData)
  }
  return (
    <form
      className='text-center py-12 px-8'
      onSubmit={handleSubmit(onSubmit as SubmitHandler<EmbeddedWork>)}
    >
      <input
        className="w-full appearance-none text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Link: Youtube, Vimeo, SoundCloud, etc."
        {...register('url', {
          required: true,
          validate: {
            playableUrl: url => ReactPlayer.canPlay(url),
          }
        })}
      />
      {errors?.url?.type === 'required' && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field. 
        </p>
      )}
      {errors?.url?.type === 'playableUrl' && (
        <p className="text-red-500 text-xs italic">
          Not a valid URL. 
        </p>
      )}
      <input
        className="w-full appearance-none text-gray-700 border border-black py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Title"
        {...register('title', { required: true })} 
      />
      {errors['title'] && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
      <Button type='submit'>
        Embed
      </Button>
      
    </form>
  )
}
