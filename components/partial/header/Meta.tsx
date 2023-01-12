import Head from "next/head";
import { AppConfig } from "../../../config/app.config";

function Meta({
  title = "",
  description = "",
  keyword = "",
  image = "",
  type = "website",
  url = "",
  domain = "",
  // commerce
  price = null,
  currency = null,
  availability = null,
  brand = null,
  product_id = null,
}) {
  return (
    <Head>
      {/* <!-- HTML Meta Tags --> */}
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      {/* <link rel="canonical" href={url} /> */}

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={`https://${url}`} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={AppConfig().app.name} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${image}`} />
      {/* commerce */}
      {type == "product" && (
        <>
          {price && <meta property="product:price:amount" content={price} />}
          {currency && (
            <meta property="product:price:currency" content={currency} />
          )}
          {availability && (
            <meta property="product:availability" content={availability} />
          )}
          {brand && <meta property="product:brand" content={brand} />}
          {product_id && (
            <meta property="product:retailer_item_id" content={product_id} />
          )}
        </>
      )}

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${image}`} />
    </Head>
  );
}

// Meta.defaultProps = {
//   title: "Custom Jewelry | Personalized Jewelry | Fine Jewelry | Exinostore",
//   description:
//     "Your destination for custom and fashion jewelry. Explore Exinostore for bracelets, necklaces, rings and more. Everyday beautiful.",
// };

export default Meta;
