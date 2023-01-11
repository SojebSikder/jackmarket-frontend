import { NextApiRequest, NextApiResponse } from "next";
import { SitemapService } from "../../service/page/sitemap.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sitemapData = await SitemapService.findAll();
  const sitemap = sitemapData.data;

  res.status(200).send(sitemap);
}
