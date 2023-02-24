import React, { useState } from 'react'
import { useRouter } from 'next/router'

import ArtistsList from '../../components/artists/artistsList'
import ArtistsFilter from '../../components/artists/artistsFilter'
import prisma from '../../lib/prisma'
import { usePaginatedArtists } from '../../lib/usePaginatedArtists'
import Layout from '../../components/layout'
import Image from 'next/image'

const ArtistListPage = ({ mediums }: { mediums: string[]}) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const router = useRouter()

  const {
    artists,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  } = usePaginatedArtists('/api/artists')

  const freezeDocument = () => {
    document.body.style.position = 'fixed'
    document.body.style.top = `-${window.scrollY}px`
  }
  
  const unfreezeDocument = () => {
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }

  const openFilters = () => {
    router.replace(`${router.pathname}#filter`)
    setFilterOpen(true)
    freezeDocument()
  }

  const closeFilters = () => {
    router.replace(`${router.pathname}`)
    setFilterOpen(false)
    unfreezeDocument()
  }

  const submitFilters = (filters: string[]) => {
    setFilters(filters)
    closeFilters()
  }

  const clearSearchInput = () => {
    setSearchTerm('')
  }

  const resetAll = () => {
    setFilters([])
    setSearchTerm('')
  }

  if (error) return <h1>Something went wrong!</h1>

  return (
    <Layout>
      <div className="text-base">
        {/* Artist search & ArtistsFilter */}
        <div className="relative min-h-44 px-4 pb-4 flex flex-col space-y-14">
          {/* Filter button */}
          <div className="flex flex-col items-center my-1">
            <button
              onClick={openFilters}
              className="uppercase flex flex-col items-center">
              <p>Filter <span className="text-blue"> {filters?.length ? `(${filters.length})` : ''}</span></p> 
              <span className="p-1">
                {filters?.length ? (
                  <Image src="/filterIconFilled.svg" alt="Filter icon" width={32} height={32} />
                ) : (
                  <Image src="/filterIcon.svg" alt="Filter icon" width={32} height={32} />
                )}
              </span>
            </button>
          </div>

          {/* Search input & Reset All & RESULTSCOUNT */}
          <div className="flex justify-between pr-2">
            <label className="relative block w-8/12">
              <span className="sr-only">Search</span>
              <input
                placeholder="Search"
                className={`
                  text-base
                  block
                  z-0
                  border
                  border-black
                  uppercase
                  shadow
                  focus:border-blue
                  transition
                  pr-0
                  focus:pl-8
                  motion-reduce:transition-none
                  motion-reduce:hover:transform-none
                  peer
                  rounded-none w-full`
                }
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span
                className={
                  'absolute inset-y-0 max-w-max bottom-0.5 right-3 peer-focus:left-0 flex items-center pl-2 z-20'
                }>
                {searchTerm?.length ? (
                  <Image src="/searchIconFilled.svg" alt="Search icon" width={16} height={16} />
                ) : (
                  <Image src="/searchIcon.svg" alt="Search icon" width={16} height={16} />
                )}
              </span>
              {Boolean(searchTerm?.length) && (
                <button
                  onClick={clearSearchInput}
                  className={
                    'absolute inset-y-0 right-0 opacity-0 items-center px-2 peer-focus:opacity-100 z-10'
                  }>
                  <Image src="/clearInputIcon.svg" alt="Clear search input" width={12} height={12} />
                </button>
              )}
              {/* FIXME: on search focus, blur bg */}
              <div
                className={`
                  hidden
                  peer-focus:block
                  z-50
                  fixed
                  inset-0
                  bg-gray-100
                  bg-opacity-75
                  transition-opacity
                  w-full
                  h-screen
                  blurred
                  border
                  border-red-500
                `}
                aria-hidden="true">
              </div>
              {/*  /////////////////////////////  */}
            </label>

            <div className="flex flex-col justify-around">
              <button
                onClick={resetAll}
                className="uppercase underline mx-auto">
                reset all
              </button>
              <p>
                ({artists.length + ' result' + (artists.length == 1 ? '' : 's')}
                )
              </p>
            </div>
          </div>
        </div>

        <ArtistsList
          artists={artists}
          fetchMore={() => setSize(size + 1)}
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
        />
      </div>

      <ArtistsFilter
        isOpen={filterOpen}
        filterOptions={mediums}
        onClose={closeFilters}
        onSubmit={submitFilters}
        onUnmount={unfreezeDocument}
        selectedFilters={filters}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const uniqueMediumsRes = await prisma.artist.findMany({
    select: {
      mediums: true,
    },
  })
  const data = JSON.parse(JSON.stringify(uniqueMediumsRes))
  const mediums = data.reduce((a: any, c: any) => {
    return [...a, ...c['mediums']]
  }, [])
  const uniqueMediums = mediums.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
  return {
    props: {
      mediums: uniqueMediums || [],
    },
  }
}

export default ArtistListPage
