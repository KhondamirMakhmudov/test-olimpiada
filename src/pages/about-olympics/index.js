import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="h-screen">
      <Header />

      {i18n.language === "uz" ? (
        <div className="h-full  mx-auto">
          <iframe
            src="/files/nizom_uz.pdf#toolbar=0&navpanes=0&scrollbar=0"
            type="application/pdf"
            className="w-full h-full bg-white"
          />
        </div>
      ) : (
        <div className="h-full  mx-auto">
          <iframe
            src="/files/nizom_rus.pdf#toolbar=0&navpanes=0&scrollbar=0"
            type="application/pdf"
            className="w-full h-full bg-white"
          />
        </div>
      )}
      {/* <main>
        <section>
          <div className="container mt-[50px] ">
            <NavbarTitle>{t("olympicsTitle")}</NavbarTitle>
            <p className=" lg:text-base text-sm  my-[50px]">
              {t("aboutOlympicsContent1")}
              <strong>{t("aboutOlympicsContent2")}</strong>
            </p>
          </div>
        </section>

        <section className="container my-[50px] ">
          <TitleLittleContent>{t("aboutOlympicsTitle")}</TitleLittleContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { color: "#5B72EE", content: "aboutOlympicsContent3" },
              { color: "#12DEB9", content: "aboutOlympicsContent4" },
              { color: "#FFAE1F", content: "aboutOlympicsContent5" },
              { color: "#49BEFF", content: "aboutOlympicsContent6" },
              { color: "#FFACC6", content: "aboutOlympicsContent7" },
              { color: "#8D7DE8", content: "aboutOlympicsContent8" },
              { color: "#8BD7E8", content: "aboutOlympicsContent9" },
            ].map(({ color, content }, index) => (
              <div
                key={index}
                className="shadow-xl rounded-md flex items-start gap-x-3 p-4 pb-0 pl-0"
              >
                <div
                  className="p-2 w-6 h-full rounded-tl-md rounded-bl-md text-white flex items-center justify-center"
                  style={{ backgroundColor: color }}
                ></div>
                <p className="text-sm py-[10px]">{t(content)}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="container">
            <TitleLittleContent>{t("aboutOlympicsTitle1")}</TitleLittleContent>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
              <div className="flex justify-center">
                <Image
                  src="/images/first-step.png"
                  alt="about-us-img"
                  width={470}
                  height={416}
                  className="w-full max-w-[470px] h-auto"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg text-[#696984] text-center md:text-left"
              >
                {t("aboutOlympics10")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
              <div className="order-1 md:order-2 flex justify-center">
                <Image
                  src="/images/second-step.png"
                  alt="about-us-img"
                  width={470}
                  height={416}
                  className="w-full max-w-[470px] h-auto"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg text-[#696984] text-center md:text-left order-2 md:order-1"
              >
                {t("aboutOlympics11")}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="my-[50px]">
          <div className="container px-4">
            <TitleLittleContent>{t("aboutOlympicsTitle2")}</TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-base md:text-lg text-[#696984] text-center md:text-left"
            >
              {t("aboutOlympics12")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-base md:text-lg text-[#696984] text-center md:text-left"
            >
              {t("aboutOlympics13")}
            </motion.p>
          </div>

          <div className="container grid grid-cols-1 md:grid-cols-2 gap-[30px] items-center mt-8">
            <div className="flex justify-center">
              <Image
                src="/images/olimpiada-banner.jpg"
                alt="prices"
                width={568}
                height={651}
                className="w-full max-w-[500px] h-auto rounded-md"
              />
            </div>

            <div>
              <ul className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-start gap-x-4">
                    <Image
                      src={`/images/winner-${num}.png`}
                      alt={`winner-${num}`}
                      width={50}
                      height={50}
                      className="w-[40px] md:w-[50px] h-auto"
                    />
                    <motion.p
                      initial={{ opacity: 0, translateY: 30 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-base md:text-lg text-[#696984]"
                    >
                      {t(`winner${num}`)}
                    </motion.p>
                  </li>
                ))}
              </ul>
              <p className="my-5 text-[#696984] max-w-[500px] text-center md:text-left">
                {t("winnerDesc")}
              </p>
            </div>
          </div>
        </section>
      </main> */}
    </div>
  );
};

export default Index;
