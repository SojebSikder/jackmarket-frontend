import { PageService } from "@/service/cms/page.service";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  let pageData;
  try {
    const pageService = await PageService.findOne(params.slug);
    pageData = pageService.data;
  } catch (error) {}

  return (
    <div>
      <div className=" flex items-center justify-center  w-full p-10 ">
        <div className="w-full">
          <p className=" flex  text-xl text-gray-600 font-semibold">
            {pageData.data.title}
          </p>
          <br />
          <div dangerouslySetInnerHTML={{ __html: pageData.data.body }}></div>
        </div>
      </div>
    </div>
  );
}
