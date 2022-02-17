import { useState } from "react";
import Artist from "../data/artist";
import { Button } from '../button/button.component';
import { useRouter } from "next/router";
import { useUser } from "../../lib/useUser";
import Link from 'next/link';

interface Props {
  artist: Artist;
  className?: string;
  includeContact?: boolean;
}

export const InfoPanel = ({
  artist,
  className,
  includeContact = true,
}: Props) => {
  const user = useUser();
  const router = useRouter();

  return (
    <div className={`${className} relative mt-2 mx-5 min-h-184`} id="infoPanel">
      <div id="info">
        <div className="w-full pt-5 pr-3 pb-12 pl-6 border-box whitespace-pre-wrap">
          {artist.bio}
        </div>
        <div className="relative inline-block pt-4 pl-7 pb-0 pr-6 h-160 my-0 mx-auto content-box">
          <div className="block absolute h-160 w-160 z-0 top-0 left-62 rounded-full border-1 border-dashed"></div>
          {artist.mediums.length == 0 ? (
            <div className="relative w-122 min-h-36" />
          ) : (
            <div className="relative w-122 min-h-36">
              Mediums:
              <br />
              {artist.mediums.join(", ")}
            </div>
          )}
          <div className="relative w-160 min-h-36 mt-12 pr-0 pb-0 pl-18">
            {artist.mediumsOfInterest.length !== 0 && (
              <>
                Mediums Of Interest:
                <br />
                {artist.mediumsOfInterest.join(", ")}
              </>
            )}
          </div>
        </div>
        <div className="grid pt-80 px-0 pb-50 grid-cols-1">
          {artist.links.map((e, i) => {
            return (
              <div
                key={"link_" + i}
                className="h-40 flex items-center justify-start py-0 px-16">
                <a
                  href={e.link}
                  className="relative block pr-29 after:content-[''] after:inline-block after:h-17 after: w-17 after:absolute after:right-0 after:top-1 after:bg-[url('/extarrow.png')]">
                  {e.title}
                </a>
              </div>
            );
          })}
        </div>
        <div className={`flex justify-end w-full py-0 px-61 mb-68`}>
          {/* TODO: add referred by */}
          {/* <div className="text-left">
            Referred By:<br/>
            <a href={"../artists/"+artist.referredBy.handle}>{artist.referredBy.name}</a>
          </div> */}
        </div>
        {includeContact && user ? (
          <Link href={`${router.asPath}/contact`}>
            <Button>
              contact
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
