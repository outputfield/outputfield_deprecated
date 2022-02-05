import Image from "next/image"
import Artist from "../data/artist";

interface Props {
  artist: Artist;
  type: "list" | "detail";
  onClick?: (event: any) => any;
}

export const ArtistRow = ({ artist, type, onClick = null }: Props) => {
  const { name, title, location, pronouns, medium } = artist;
  let row = (
    <div className="border-y border-black border-dashed w-full flex flex-row px-3 py-5">
      {/* TODO: add artist photo */}
      <Image
        alt="Artist profile pic"
        src="https://via.placeholder.com/100"
        // layout="fill"
        height={100}
        width={100}
        className="rounded-full"
      />
      <div>
        <h1>{name}</h1>
        <br />
        {title && (
          <>
            <div className="italic">{title}</div>
            <span className="text-3xl font-light">&#9702;</span>
          </>
        )}
        <div>{location}</div>
        <br />
        {type == "detail" && <div>{pronouns}</div>}
      </div>
      <div>{medium}</div>
    </div>
  );

  if (type == "detail") {
    return row;
  } else {
    return <a onClick={onClick}>{row}</a>;
  }
};
