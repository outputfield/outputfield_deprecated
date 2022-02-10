import Image from "next/image";
import Artist from "../data/artist";

interface Props {
  artist: Artist;
  type: "list" | "detail";
  onClick?: (event: any) => any;
}

export const ArtistRow = ({ artist, type, onClick = null }: Props) => {
  const { name, title = "painter", location, pronouns, medium } = artist;

  return (
    <div
      onClick={type === "list" ? () => onClick() : undefined}
      className={`${type === "detail" ? "border-y" : ""} ${
        type === "list" ? "border-b last-of-type:border-0" : ""
      } border-black border-dashed w-full h-min flex flex-col relative px-2 py-3`}>
      <div className="grow relative flex justify-center self-start items-center">
        <div className="mr-3">
          <Image
            alt="Artist profile pic"
            src="https://via.placeholder.com/100"
            // layout="fill"
            height={100}
            width={100}
            className="rounded-full"
          />
          {type == "detail" && <div className="text-center">{pronouns}</div>}
        </div>
        <div className="py-auto">
          {name}
          <br />
          <span className="italic">{title}</span>
          {title && location && (
            <span className="text-3xl font-light mx-1 align-sub">&#9702;</span>
          )}
          <span>{location}</span>
        </div>
      </div>
      <div className="text-right uppercase absolute right-0 bottom-3">
        {medium}
      </div>
    </div>
  );

  // if (type == "detail") {
  //   return row;
  // } else {
  //   return <a onClick={onClick}>{row}</a>;
  // }
};
