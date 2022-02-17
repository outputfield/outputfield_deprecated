import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import ArtistsFilter from "./artistsFilter.tsx";
import prisma from "../../lib/prisma";
import { usePaginatedArtists } from '../../lib/usePaginatedArtists'
import { convertDataToArtists } from "../../lib/misc";
import { ArtistRow } from "../../components/artists/artistRow.component";
import { Button } from "../../components/button/button.component";
import { Checkbox } from "../../components/checkbox.tsx";

const ArtistListPage = ({ mediums }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();
  // https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/#paginating-the-data-with-useswrinfinite
  const { artists, error, isLoadingMore, size, setSize, isReachingEnd } =
    usePaginatedArtists("/api/artists");

  const openFilters = () => {
    router.replace(`${router.pathname}#filter`);
    setFilterOpen(true);
    // freeze document body
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };

  const closeFilters = () => {
    router.replace(`${router.pathname}`);
    setFilterOpen(false);
    // unfreeze document body
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  if (error) return <h1>Something went wrong!</h1>

  return (
    <div>
      <div>
        <div>
          <input
            placeholder="search"
            className={`border border-black focus:border-blue-500 z-20 peer rounded-none`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                console.log(`searchterm: ${searchTerm}`);
              }
            }}
          />
          {/* FIXME: on search focus, blur bg */}
          {/* <div
            className={`${false && "hidden peer-within-focus:block"} z-10 fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity w-full h-screen blurred border border-red-500`}
            aria-hidden="true"
          >bg</div> */}

          <button onClick={openFilters} className="uppercase mx-auto">
            filter
          </button>
          <div>
            {artists.length + " result" + (artists.length == 1 ? "" : "s")}
          </div>
        </div>
        <div>
          {artists.map((e, i) => {
            return (
              <ArtistRow
                key={e.handle}
                artist={e}
                onClick={() => {
                  router.push("/artists/" + e.handle);
                }}
                type="list"
              />
            );
          })}
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}>
            {isLoadingMore
              ? "Loading..."
              : isReachingEnd
              ? "No more posts"
              : "Load more"}
          </button>
        </div>
      </div>
      {filterOpen && <ArtistsFilter filters={mediums} onClose={closeFilters} />}
    </div>
  );
};

export async function getStaticProps() {
  // TODO: implement paginated search here
  const artistsRes = await prisma.artist.findMany({
    include: {
      work: true,
      links: true,
    },
  });
  const uniqueMediumsRes = await prisma.artist.findMany({
    distinct: "medium",
    select: {
      medium: true,
    },
  });
  const artists = JSON.parse(JSON.stringify(artistsRes));
  const mediums = JSON.parse(JSON.stringify(uniqueMediumsRes));
  return {
    props: {
      artists,
      mediums,
    },
  };
}

export default ArtistListPage;
