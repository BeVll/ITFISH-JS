import { games } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  const game = games.find((g) => g.slug === slug);

  return Response.json(game);
}
