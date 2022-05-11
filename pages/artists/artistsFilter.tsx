import React, { useState, useEffect, useMemo } from 'react'
import Overlay from '../../components/overlay'
import Checkbox from '../../components/checkbox'
import { Button } from '../../components/button/button.component'

export default function ArtistsFilter({
  onClose,
  onSubmit,
  onUnmount,
  filters: mediums,
  selectedFilters,
  className,
}) {
  const [filters, setFilters] = useState(null)

  const filtersCount = useMemo(() => {
    if (filters && Object.values(filters).some((f) => f === true)) {
      return Object.values(filters).filter((f) => f === true).length
    } else {
      return 0
    }
  }, [filters])

  // Set default filters on mount
  useEffect(() => {
    const defaultFilters = {}
    console.log(selectedFilters)
    mediums.forEach(( medium ) => {
      defaultFilters[medium] = selectedFilters.includes(medium)
    })
    setFilters(defaultFilters)
  }, [mediums])

  // Unfreeze scrolling on unmount
  useEffect(() => {
    return (() => onUnmount())
  }, [])

  const onCheckChange = (name, value) => {
    const _filters = { ...filters }
    _filters[name] = value
    setFilters(_filters)
  }

  const clearFilters = () => {
    const _filters = { ...filters }
    Object.keys(_filters).forEach((k) => (_filters[k] = false))
    setFilters(_filters)
  }

  const handleSubmit = () => {
    // convert filters to list
    const filtersList = Object.keys(filters).reduce(
      (a, c) => (filters[c] ? [...a, c] : a),
      []
    )
    onSubmit(filtersList)
  }

  return (
    <Overlay className={className}>
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
          <img src="/closeIcon.svg" alt="close overlay icon" />
        </button>
      </div>
      <div className="my-5 text-center">
        <form className="mx-auto max-w-fit">
          {mediums.map(( medium ) => {
            const n = `filters[${medium}]`
            return (
              <Checkbox
                key={medium}
                name={medium}
                label={medium}
                value={filters ? filters[medium] : false}
                onChange={onCheckChange}
              />
            )
          })}
        </form>
        <div className="relative flex flex-col justify-center items-center mt-24 z-0">
          <img src="/diagramLines.svg" className="absolute -z-10"/>
          <Button
            onClick={handleSubmit}
            className="absolute w-48 inline-flex justify-center"
            disabled={filtersCount === 0}>
            Filter <span className="glow-highlight text-highlight ml-1">{`(${filtersCount})`}</span>
          </Button>
        </div>
      </div>
    </Overlay>
  )
}
