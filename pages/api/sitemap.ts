import { NextApiRequest, NextApiResponse } from "next";
import { SitemapService } from "../../service/page/sitemap.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sitemapData = await SitemapService.findAll();

  res.status(200).send(sitemapData);
}
