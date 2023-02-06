import { Container } from "react-bootstrap";
import Navbar from "../components/partial/header/Navbar";
import { getSetting, getSettingValue } from "../utils/Setting";
import Footer from "../components/partial/footer/Footer";
import { FooterService } from "../service/page/footer.service";
import Main from "../components/partial/Main";
import Meta from "../components/partial/header/Meta";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const message = query.message ? query.message : null;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  return {
    props: {
      footerData: footerData,
      settings: settings,
      host: req.headers.host,
      message: message,
    },
  };
};

export default function Index({
  footerData,
  settings,
  host,
  message,
}: {
  footerData: any;
  settings: any;
  host: string;
  message: any;
}) {
  return (
    <>
      <Meta
        title={`Thank you - ${getSettingValue("name", settings)}`}
        description={`${getSettingValue("meta_description", settings)}`}
        keyword={`${getSettingValue("meta_keyword", settings)}`}
        url={`${host}/thankyou`}
        domain={host}
      />
      <Navbar />
      <Main>
        <Container>
          <div className="row">
            <div className="col">{message}</div>
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
