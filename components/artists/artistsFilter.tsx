import React, { useEffect, useMemo, useReducer } from 'react'
import Overlay from '../../components/overlay'
import Checkbox from '../../components/checkbox'
import { Button } from '../../components/Button'
import Image from 'next/image'

interface Props {
  isOpen: boolean,
  onClose: () => void;
  onSubmit: (filters: string[]) => void;
  onUnmount: () => void;
  filterOptions: string[];
  selectedFilters: string[];
}

type FilterAction = ({ type: 'UPDATE', filterName: string }) | {type: 'CLEAR'}

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
        return { [action.filterName]: !_state[action.filterName], ...state }
      case 'CLEAR':
        return Object.keys(_state).reduce((acc, curr) => ({[curr]: false, ...acc }), {})
      }
      
    },
    filterOptions.reduce((acc, curr) => ({[curr]: selectedFilters.includes(curr), ...acc}), {})
  )

  const filtersCount = useMemo(() => {
    if (state && Object.values(state).some((f) => f === true)) {
      return Object.values(state).filter((f) => f === true).length
    } else {
      return 0
    }
  }, [state])

  // Unfreeze scrolling on unmount
  useEffect(() => {
    return (() => onUnmount())
  }, [])

  const onCheckChange = (name: string) => {
    dispatch({ type: 'UPDATE', filterName: name })
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
    <Overlay className={`${isOpen? 'visible': 'hidden'}`}>
      <div className="mt-0 sm:mt-0 sm:ml-4 flex justify-between border-b border-black border-dashed px-4 pb-4">
        <button
          className="underline uppercase leading-6 disabled:text-gray"
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
      <div className="my-5 text-center">
        <form className="mx-auto max-w-fit">
          {filterOptions.map(( medium ) => {
            const n = `filters[${medium}]`
            return (
              <Checkbox
                key={medium}
                name={medium}
                label={medium}
                value={state ? state[medium] : false}
                onChange={onCheckChange}
              />
            )
          })}
        </form>
        <div className="relative flex flex-col justify-center items-center mt-24 z-0">
          <img alt="diagram lines" src="/diagramLines.svg" className="absolute -z-10"/>
          <Button
            onClick={handleSubmit}
            // className="absolute w-48 inline-flex justify-center"
            disabled={filtersCount === 0}>
            Filter <span className="glow-highlight text-highlight ml-1">{`(${filtersCount})`}</span>
          </Button>
        </div>
      </div>
    </Overlay>
  )
}

export default ArtistsFilter