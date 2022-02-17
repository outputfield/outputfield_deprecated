import { useState, useMemo, useEffect } from "react";
import { useSWRInfinite } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const usePaginatedArtists = (path) => {
  // TODO: hardcode path = '/api/artists (?)
  const [cursor, setCursor] = useState(null);
  if (!path) {
    throw new Error("Path is required");
  }

  const url = path;
  const PAGE_LIMIT = 5;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${url}?_page=${index + 1}&_limit=${PAGE_LIMIT}&_cursor=${cursor}`,
    fetcher
  );

//   const artists = useMemo(() => {
//     // console.log(data);
//     // const newCursor = data?.length ? data[data.length - 1].id : null;
//     // setCursor(newCursor); // FIXME: This may be causing fetch to run again
//     return data ? [].concat(...data) : [];
//   }, [data]);
//   useEffect(() => {
//       console.log(data);
//     const newCursor = data?.length ? data[data.length - 1].id : null;
//     setCursor(newCursor); // FIXME: This may be causing fetch to run again
//   }, [artists]);
    const artists = data ? [].concat(...data) : [];
  console.log(artists);
  //   debugger
  

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return { artists, error, isLoadingMore, size, setSize, isReachingEnd };
};
