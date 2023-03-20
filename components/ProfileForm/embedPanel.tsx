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
      className='text-left mt-16 px-8'
      onSubmit={handleSubmit(onSubmit as SubmitHandler<EmbeddedWork>)}
    >
      <input
        className="w-full py-4 px-3 appearance-none text-base text-gray-700 border border-black mb-3 leading-tight focus:outline-none focus:bg-white"
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
        className="w-3/5 py-4 px-3 appearance-none text-base text-gray-700 border border-black mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Title"
        {...register('title', { required: true })} 
      />
      {errors['title'] && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
      <div className='mt-24 mb-10'>
        <Button type='submit'>
        Embed
        </Button>
      </div>
      <div className='text-center'>
        <p>
        Supported embeds:
        </p>
        <br />
        <ul>
          <li>YouTube</li>
          <li>Facebook</li>
          <li>SoundCloud</li>
          <li>Vimeo</li>
          <li>Twitch</li>
          <li>DailyMotion</li>
          <li>Wistia</li>
          <li>Vidyard</li>
        </ul>
      </div>
    </form>
  )
}
