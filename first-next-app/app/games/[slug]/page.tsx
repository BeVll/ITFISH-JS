import { Game } from "@/lib/data";
import React from "react";
import Image from "next/image";
import axios from "axios";

const getGame = async (slug: string) => {
  const res = await axios.get("http://localhost:5001/games/" + slug);
  console.log(res);
  return res.data;
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const game = await getGame(slug);

  return (
    <div>
      <GameDetails game={game} />
    </div>
  );
}

export function GameDetails({ game }: { game: Game }) {
  return (
    <div className="flex w-full p-8 gap-4">
      <div className="relative aspect-5/6  ">
        <Image
          height={500}
          width={300}
          src={game.image}
          alt=""
          className="group-hover:scale-110 z-10 transition-all"
        />
      </div>
      <div className="flex flex-col h-full justify-center items-start gap-2">
        <span>{game.yearOfRelease}</span>
        <h1 className="font-bold text-4xl"> {game.title}</h1>
        <div className="flex items-center gap-2">
          {game.developer} | {game.genre} | {game.rating}
        </div>
        <p className="max-w-3xl">{game.description}</p>
        {/* <div className="bg-white/15 rounded-lg p-[8px]">
          <div className="flex items-center gap-2">
            <strong>Процесор:</strong> {game.recommendedSpecs.processor}
          </div>
          <div className="flex items-center gap-2">
            <strong>Відеокарта:</strong> {game.recommendedSpecs.graphics}
          </div>
          <div className="flex items-center gap-2">
            <strong>Операційна система:</strong> {game.recommendedSpecs.os}
          </div>
          <div className="flex items-center gap-2">
            <strong>Памʼять: </strong> {game.recommendedSpecs.memory}
          </div>
        </div> */}
      </div>
    </div>
  );
}
