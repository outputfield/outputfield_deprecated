import React, { useEffect, useMemo, useReducer } from 'react'
import Overlay from '../../components/overlay'
import Checkbox from '../../components/checkbox'
import { Button } from '../../components/Button'
import Image from 'next/image'
import DashedDivider from '../dashedDivider'
import { Medium } from '@prisma/client'

interface Props {
  isOpen: boolean,
  onClose: () => void;
  onSubmit: (filters: string[]) => void;
  onUnmount: () => void;
  filterOptions: Medium[];
  selectedFilters: string[];
}

type FilterAction = ({ type: 'UPDATE', filterName: string, value: boolean }) | {type: 'CLEAR'}

interface FilterState {
  [x: string]: boolean;
}

const ArtistsFilter: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  onUnmount,
  filterOptions,
  selectedFilters,
}) => {
  const [state, dispatch] = useReducer(
    (state: FilterState, action: FilterAction) => {
      const _state = {...state}
      switch(action.type) {
      case 'UPDATE':
        return { ...state, [action.filterName]: action.value }
      case 'CLEAR':
        return Object.keys(_state).reduce((acc, curr) => ({[curr]: false, ...acc }), {})
      }
    },
    filterOptions.reduce((acc, {name}) => ({[name]: selectedFilters.includes(name), ...acc}), {})
  )

  const filtersCount = useMemo(() => {
    if (state) {
      return Object.values(state).filter((f) => f === true).length
    } else {
      return 0
    }
  }, [state])

  // Unfreeze scrolling on unmount
  useEffect(() => {
    return (() => onUnmount())
  }, [])

  const onCheckChange = (name: string, value: boolean) => {
    console.log(name, value)
    dispatch({ type: 'UPDATE', filterName: name, value })
  }

  const clearFilters = () => dispatch({ type: 'CLEAR' })

  const handleSubmit = () => {
    // convert filters to list
    const filtersList = Object.keys(state).reduce<string[]>(
      (a, c) => (state[c] ? [...a, c] : a),
      []
    )
    onSubmit(filtersList)
  }

  return (
    <Overlay aria-label="Artists Filter" className={`${isOpen? 'visible': 'hidden'}`}>
      <div className={`
        px-4
        mt-0
        sm:mt-0
        sm:ml-4
        flex
        justify-between
      `}>
        <button
          className={'underline uppercase leading-6 disabled:text-gray' + (filtersCount === 0 && 'cursor-not-allowed')}
          type="reset"
          onClick={clearFilters}
          disabled={filtersCount === 0}
        >
          Clear Filters
        </button>
        <button onClick={onClose}>
          <Image src="/closeIcon.svg" alt="close" width={16} height={16} />
        </button>
      </div>
      <DashedDivider />
      <div className="my-5 text-center">
        <form className="mx-auto max-w-fit">
          {filterOptions.map(( {id, name} ) => {
            return (
              <Checkbox
                key={id}
                name={name}
                label={name}
                value={state ? state[name] : false}
                onChange={onCheckChange}
              />
            )
          })}
        </form>
        <div className="relative flex flex-col justify-center items-center mt-24 z-0">
          <Image alt="diagram lines" src="/diagramLines.svg" className="absolute -z-10" width={140} height={160}/>
          <Button
            onClick={handleSubmit}
            disabled={filtersCount === 0}>
            Filter <span className="glow-highlight text-highlight ml-1">{`(${filtersCount})`}</span>
          </Button>
        </div>
      </div>
    </Overlay>
  )
}

export default ArtistsFilter