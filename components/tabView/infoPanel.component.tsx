import React from 'react'
// import Artist from '../data/artist'
import { Button } from '../button/button.component'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArtistWithUserAndReferredByAndWorkAndLinks } from '../../pages/api/artists/[name]'

interface Props {
  artist: ArtistWithUserAndReferredByAndWorkAndLinks;
  className?: string;
  includeContact?: boolean;
}

export const InfoPanel: React.FC<Props> = ({
  artist,
  className,
  includeContact = true,
}) => {
  const router = useRouter()

  console.log(artist)

  return (
    <div
      className={`${className} relative min-h-184 grid text-base p-3`}
      id="infoPanel">
      <div
        id="bio"
        className="w-full mb-8 border-box whitespace-pre-wrap uppercase">
        {artist?.bio}
      </div>

      <div
        id="mediums"
        className="relative uppercase inline-block h-36 w-9/12 mb-16 mx-auto content-box ">
        <img src="/dashedCircle.svg" className="absolute ml-4" />
        <div className="flex flex-col justify-between mt-4 h-full">
          {artist?.mediums.length !== 0 && (
            <div className="relative">
              <b>Mediums:</b>
              <br />
              {artist?.mediums.join(', ')}
            </div>
          )}
          {artist?.mediumsOfInterest.length !== 0 && (
            <div className="relative self-end">
              <b>Mediums Of Interest:</b>
              <br />
              {artist?.mediumsOfInterest.join(', ')}
            </div>
          )}
        </div>
      </div>

      <div id="artistLinks" className="relative mb-24 h-32">
        <img src="/dashedEllipses4.svg" className="absolute" />
        <div className="absolute flex flex-col space-y-4 mt-4">
          {artist?.links.map(({ type, link }) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="uppercase flex space-x-2 items-center">
              <span>{type}</span>
              <img src="/externalLinkIcon.svg" />
            </a>
          ))}
        </div>
      </div>
      {
        artist?.referredBy && (
          <div id="artistReference" className={'flex justify-end relative w-full h-20 mb-20'}>
            <img src="/dashedEllipses2.svg" className="absolute" />
            <div className="absolute uppercase mt-2 mr-8">
          Referred By:
              <br />
              <a
                className="underline glow-highlight"
                href={'/artists/'+artist?.referredBy?.handle}
              >
                {artist?.referredBy?.user.name}
              </a>
            </div>
          </div>
        )
      }
      

      {includeContact && (
        <Link href={`${router.asPath}/contact`} passHref>
          <a>
            <Button className="mb-8 w-7/12 text-lg">contact</Button>
          </a>
        </Link>
      )}
    </div>
  )
}
