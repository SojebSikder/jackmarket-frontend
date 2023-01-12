import styles from "../styles/Home.module.css";
import { Alert, Button, Container } from "react-bootstrap";
import Navbar from "../../components/partial/header/Navbar";
import Sidebar from "../../components/partial/sidebar/Sidebar";
import ProductCard from "../../components/resuable/product/ProductCard";
import { getSetting } from "../../utils/Setting";
import { ProductService } from "../../service/product/product.service";
import { CategoryService } from "../../service/category/category.service";
import Footer from "../../components/partial/footer/Footer";
import { FooterService } from "../../service/page/footer.service";
import Main from "../../components/partial/Main";
import { PageService } from "../../service/page/page.service";
import Meta from "../../components/partial/header/Meta";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const slug = query.slug;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  const pageService = await PageService.findOne(slug);
  const pageData = pageService.data;

  return {
    props: {
      footerData: footerData,
      pageData: pageData,
      settings: settings,
      host: req.headers.host,
    },
  };
};
export default function Index({
  footerData,
  pageData,
  host,
}: {
  footerData: any;
  pageData: any;
  host: string;
}) {
  return (
    <>
      <Meta
        title={`${pageData.meta_title ? pageData.meta_title : pageData.title}`}
        description={`${pageData.meta_description}`}
        keyword={`${pageData.meta_keyword}`}
        type={"website"}
        url={`${host}/${pageData.slug}`}
        domain={host}
      />
      <Navbar />
      <Main>
        <Container>
          <div dangerouslySetInnerHTML={{ __html: pageData.body }}></div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
