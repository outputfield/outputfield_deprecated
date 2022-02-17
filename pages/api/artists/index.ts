import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("hitting /api/artists with: ", req.query, req.params);
  const { _page, _limit, _cursor } = req.query;

  if (req.method === "GET") {
    try {
      const data = await prisma.artist.findMany({
        take: parseInt(_limit),
        // cursor: _page * _limit,
        // skip: _cursor !== "null" ? 1 : undefined,
        skip: parseInt(_limit) * (parseInt(_page) - 1),
        // cursor: _cursor !== "null" ? { id: parseInt(_cursor) } : undefined,
        include: {
          work: true,
          links: true,
        },
        // where: {
        //   mediums: {
        //     contains: filters
        //   }
        // }
      });
      if (!data) {
        return res.status(404);
      } else {
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(405);
      console.log(err);
      res.end();
    }
  }
}
