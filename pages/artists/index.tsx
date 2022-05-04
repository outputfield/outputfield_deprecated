import React, { useState } from 'react'
import { useRouter } from 'next/router'

import ArtistsList from './artistsList'
import ArtistsFilter from './artistsFilter'
import prisma from '../../lib/prisma'
import { usePaginatedArtists } from '../../lib/usePaginatedArtists'
import Layout from '../../components/layout'

const ArtistListPage = ({ mediums }: any) => {
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

  const submitFilters = (filters) => {
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
      {/* FIXME: on search focus, blur bg */}
      <div
        className={`${'hidden peer-focus:block '} z-10 fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity w-full h-screen blurred border border-red-500`}
        aria-hidden="true">
        bg
      </div>
      {/*  /////////////////////////////  */}

      <div className="text-base">
        {/* Artist search & ArtistsFilter */}
        <div className="relative min-h-44 px-4 pb-4 flex flex-col space-y-14">
          {/* Filter button */}
          <div className="flex flex-col items-center my-1">
            <button
              onClick={openFilters}
              className="uppercase flex flex-col items-center">
              <p>filter <span className="text-blue"> {filters?.length ? `(${filters.length})` : ''}</span></p> 
              <div className="p-1">
                {filters?.length ? (
                  <img src="/filterIconFilled.svg" alt="Filter icon" />
                ) : (
                  <img src="/filterIcon.svg" alt="Filter icon" />
                )}
              </div>
            </button>
          </div>

          {/* Search input & Reset All & RESULTSCOUNT */}
          <div className="flex justify-between pr-2">
            <label className="relative block w-8/12">
              <span className="sr-only">Search</span>
              <input
                placeholder="Search"
                className={
                  'text-base block z-0 border border-black uppercase shadow focus:border-blue transition pr-4 focus:pl-8 motion-reduce:transition-none motion-reduce:hover:transform-none peer rounded-none w-full'
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
                  <img src="/searchIconFilled.svg" alt="Search icon" />
                ) : (
                  <img src="/searchIcon.svg" alt="Search icon" />
                )}
              </span>
              {Boolean(searchTerm?.length) && (
                <button
                  onClick={clearSearchInput}
                  className={
                    'absolute inset-y-0 right-0 opacity-0 items-center px-2 peer-focus:opacity-100 z-10'
                  }>
                  <img src="/clearInputIcon.svg" alt="Clear search input" />
                </button>
              )}
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
        filters={mediums}
        onClose={closeFilters}
        onSubmit={submitFilters}
        onUnmount={unfreezeDocument}
        selectedFilters={filters}
        className={`${filterOpen? 'visible': 'hidden'}`}
      />

    </Layout>
  )
}

export async function getStaticProps() {
  const artistsRes = await prisma.artist.findMany({
    include: {
      user: true,
      work: true,
      links: true,
    },
  })
  const uniqueMediumsRes = await prisma.artist.findMany({
    distinct: 'mediums',
    select: {
      mediums: true,
    },
  })
  const artists = JSON.parse(JSON.stringify(artistsRes))
  // TODO: Sort by name
  const mediums = JSON.parse(JSON.stringify(uniqueMediumsRes))
  return {
    props: {
      artists,
      mediums,
    },
  }
}

export default ArtistListPage
