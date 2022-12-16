import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const fetcher = (url: any) => fetch(url).then((res) => res.json())

// Based on https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/#paginating-the-data-with-useswrinfinite
export const usePaginatedArtists = (path: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filters, setFilters] = useState<string[]>([])
  if (!path) {
    throw new Error('Path is required')
  }

  const url = '/api/artists'
  const PAGE_LIMIT = 5

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}?_page=${
        index + 1
      }&_limit=${PAGE_LIMIT}&search=${searchTerm}&filters=${JSON.stringify(
        filters
      )}`,
    fetcher
  )

  const artists = data ? [].concat(...data) : []

  const isLoadingInitialData: boolean = !data && !error
  const isLoadingMore: boolean =
    isLoadingInitialData ||
      Boolean(size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty: boolean = data?.[0]?.length === 0
  const isReachingEnd: boolean =
    isEmpty || Boolean(data && data[data.length - 1]?.length < PAGE_LIMIT)

  return {
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
  }
}
