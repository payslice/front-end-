import Main from "../../../containers/Main";
import TermsHero from "../../../containers/Terms/TermsHero";
import TermsOfService from "../../../containers/Terms/TermsOfService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";
import frFinancing from "../../../public/locales/fr/fr-financing";
import enFinancing from "../../../public/locales/en/en-financing";
import { useRouter } from "next/router";

const Terms = () => {
  const router = useRouter();
  const { t } = useTranslation("term-of-service");
  const { locale } = router;

  const translate = locale === "en" ? enFinancing : frFinancing;

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (document) {
      setWindowWidth(document.documentElement.clientWidth);
    }
  });
  return (
    <>
      <div className="get-prequalified-container">
        <div className="get-prequalified-regular-hero hero-mob">
          <div className="hero-bg loan-img-bg">
            {windowWidth > 990 ? (
              <img
                src="https://media.autochek.africa/file/publicAssets/bg-coming-soon.png"
                alt=""
              />
            ) : (
              <Image
                src="https://media.autochek.africa/file/publicAssets/bg-coming-soon.png"
                alt=""
                layout="responsive"
                width="100"
                height="100"
                quality="1"
                priority="true"
              />
            )}

            <div className="mask"></div>
          </div>
          <div className="loan-hero-div-container">
            <div className="loan-hero-div">
              <div className="mb-20-mob buy-now-div">
                <h1 className="buy-now"> {translate["Buy Now and"]}</h1>

                <h1 className="pay-monthly">
                  <span>{translate["Pay"]}</span>
                  <span
                    style={{
                      color: "#FFC107",
                      paddingLeft: "10px",
                    }}
                  >
                    {translate["Monthly"]}
                  </span>
                </h1>
                <div
                  style={{
                    display: "flex",
                    marginTop: "50px",
                  }}
                >
                  <div>
                    <p>{translate["Up to"]}</p>
                    <p
                      className="mt-10"
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      36 Months
                    </p>
                    <p className="mt-10">{translate["Repayment Period"]}</p>
                  </div>
                  <div>
                    <p>{translate["Starting from"]}</p>
                    <p
                      className="mt-10"
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      18%
                    </p>
                    <p className="mt-10">
                      {translate["Interest rate per annum"]}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Image
                  src="https://media.autochek.africa/file/publicAssets/Group-11202.png"
                  alt=""
                  layout="responsive"
                  width="100"
                  height="100"
                  quality="1"
                  priority="true"
                />
              </div>
            </div>

            <div className="action"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["term-of-service"])),
      // Will be passed to the page component as props
    },
  };
}

export default Terms;
