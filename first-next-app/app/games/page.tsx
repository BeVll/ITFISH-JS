import { Game } from "@/lib/data";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const getGames = async () => {
  const res = await axios.get("http://localhost:5001/games");
  return res.data;
};

export default async function page() {
  const games: Game[] = await getGames();
  return (
    <div className="min-h-screen w-screen grid-row grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 md:p-20 p-4">
      {games.map((game) => (
        <GameCard
          key={game.slug}
          imageSrc={game.image}
          title={game.title}
          slug={game.slug}
        />
      ))}
    </div>
  );
}

export function GameCard({
  imageSrc,
  title,
  slug,
}: {
  imageSrc: string;
  title: string;
  slug: string;
}) {
  return (
    <Link href={"/games/" + slug}>
      <div className="bg-white/10 cursor-pointer rounded-lg hover:brightness-150 transition-all  overflow-hidden  w-full flex flex-col group">
        <div className="relative aspect-5/6   w-full">
          <Image
            height={500}
            width={300}
            src={imageSrc}
            alt=""
            className="group-hover:scale-110 z-10 transition-all"
          />
          <div className="absolute z-40 p-2 w-full h-full bottom-0 pb-4 flex items-end">
            <p className="font-bold text-lg text-center w-full ">{title}</p>
          </div>
          <div className="absolute w-full z-20 h-full top-0 bg-linear-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
    </Link>
  );
}
