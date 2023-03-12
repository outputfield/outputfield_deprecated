import React, { useState, BaseSyntheticEvent} from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { makeid } from '../../lib/utils'
import Image from 'next/image'

export type MediumOptionT = {
  id: number,
  label: string
  }

type MediumsComboboxProps = {
  name: string,
  label: string,
  options: MediumOptionT[],
  selectedMediums: MediumOptionT[],
  setSelectedMediums: (mediums: MediumOptionT[]) => void,
}
  
export default function MediumsCombobox({
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
  
  function clearMediums(e: BaseSyntheticEvent) {
    e.preventDefault()
    setSelectedMediums([])
  }

  return (
    <div className="flex w-5/6 mb-3">
      <div className="mt-8 ml-3 mr-2">
        <Image
          src='/fourpointstar.svg'
          alt='*'
          width='16'
          height='16'
        />
      </div>
      <span className="w-full">
        {label && (
          <label
            htmlFor={label}
            className="block uppercase tracking-wide text-gray-700 text-sm mb-2">
            {label}
          </label>
        )}
        <div className='flex items-center justify-center relative'>
          <Combobox
            multiple
            nullable
            value={selectedMediums}
            onChange={setSelectedMediums}
            name={name}
          >
            <div className="w-full relative mt-1 text-base">
              <div className={`
                relative
                w-full
                cursor-default
                overflow-hidden
                bg-white
                text-left
                border border-color-[#D5D8DC]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-opacity-75
                focus-visible:ring-offset-2
                focus-visible:ring-offset-teal-300
                sm:text-sm
              `}>
                <div className='flex flex-wrap'>
                  {selectedMediums.map((medium) => (
                    <div
                      key={medium.id}
                      className={'ml-1 my-1 py-2 px-4 rounded-full bg-blue text-white max-w-fit shrink-0'}
                    >
                      {medium.label}
                      <button
                        onClick={() => setSelectedMediums(selectedMediums.filter(({ id }) => id !== medium.id))}
                        className='font-gray ml-3'>
                      X
                      </button>
                    </div>
                  ))}

                  <Combobox.Button as='span' className="flex items-center">
                    {({ open }) => (
                      <>
                        <Combobox.Input
                          className=" border-none py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 grow"
                          onChange={(event) => {
                            const value = event.target.value.includes(',') ? event.target.value.split(selectedMediums.join(','))[1] : event.target.value
                            setQuery(value)
                          }}
                          value={query}
                        />
                        { Boolean(selectedMediums.length) && (
                          <button className="absolute right-6 underline" onClick={clearMediums}>
                        clear
                          </button>
                        )}
                        <button className="absolute right-2 shrink">
                          { open ? '^': 'v'}
                        </button>
                      </>
                    )}
                  </Combobox.Button>
                 
                  
                    
                </div>
              </div>
              <Transition
                as={React.Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options
                  className={`
                    absolute
                    mt-1
                    border
                    border-black
                    max-h-60 w-full overflow-auto
                    bg-white
                    z-50
                    cursor-pointer
                  `}
                >
                  {query.length > 0 && !selectedMediums.filter(({ label }) => label === query).length && (
                    <Combobox.Option
                      value={{ id: makeid(3), label: query}}
                      onClick={() => setQuery('')}
                      className="m-1"
                    >
                      + Add &quot;{query}&quot;
                    </Combobox.Option>
                  )}
                  {filteredOptions.map((medium) => (
                    <Combobox.Option
                      key={medium.id}
                      value={medium}
                      disabled={selectedMediums.filter(({ label }) => label === medium.label).length !== 0}
                    >
                      {({ active, selected, disabled }) => (
                        <div className={`p-1 cursor-pointer ${disabled && 'cursor-not-allowed bg-gray-light'} ${active && 'bg-gray-dark'} ${selected && 'bg-pink'}`}>{medium.label}</div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </span>
    </div>
  )
}
  