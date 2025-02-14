import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header color="black" />

      <main className=" ">
        <section
          className=" bg-center bg-cover bg-no-repeat bg-[#FFF3E4]"
          // style={{ backgroundImage: `url(/images/about-us-bg.png)` }}
        >
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center px-4 md:px-6 lg:px-10">
            {/* Text Content */}
            <div>
              <h1 className="text-[#F48C06] text-[48px] md:text-[42px] sm:text-[36px]">
                IQ <span className="text-[#2F327D]">math</span>
              </h1>

              <p className="text-[#F48C06] text-[32px] md:text-[28px] sm:text-[24px]">
                {t("aboutusTitle")}
              </p>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.3 }}
                className="my-6 text-lg md:text-base sm:text-sm text-[#696984]"
              >
                {t("aboutusContent1")}
              </motion.p>
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end">
              <Image
                src={"/images/main-img-about-us.png"}
                alt="about-us-img"
                width={544}
                height={314}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="container my-10 px-4 md:px-6">
          {/* First Section */}
          <div>
            <TitleLittleContent>
              <p className="text-[#2F327D] text-xl md:text-2xl">
                {t("aboutusTitle1")}
              </p>
            </TitleLittleContent>

            <div className="border flex items-start gap-x-3 p-6 rounded-md mt-6">
              <Image
                src="/icons/about-us.svg"
                alt="about-us-icon"
                width={16}
                height={16}
              />

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-base sm:text-sm text-[#696984]"
              >
                {t("aboutusContent2")}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section className="container my-10 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <TitleLittleContent>
                <p className="text-[#F48C06] text-xl md:text-2xl">
                  {t("aboutusTitle2")}
                </p>
              </TitleLittleContent>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.5 }}
                className="my-4 text-lg md:text-base sm:text-sm text-[#696984]"
              >
                {t("aboutusContent3")}
              </motion.p>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/about-us-img1.png"
                alt="about-us-img"
                width={611}
                height={382}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Third Section with Background */}
        <section className="bg-[#FAFAFA] py-8 md:py-12">
          <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 md:px-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/about-us-img2.png"
                alt="about-us-img"
                width={508}
                height={414}
                className="max-w-full h-auto"
              />
            </div>

            <div>
              <TitleLittleContent>
                <p className="text-[#F48C06] text-xl md:text-2xl">
                  {t("aboutusTitle3")}
                </p>
              </TitleLittleContent>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.5 }}
                className="my-4 text-lg md:text-base sm:text-sm text-[#696984]"
              >
                {t("aboutusContent4")}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Last Section */}
        <section className="container my-10 px-4 md:px-6">
          <div>
            <TitleLittleContent>
              <p className="text-[#2F327D] text-xl md:text-2xl">
                {t("aboutusTitle4")}
              </p>
            </TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-4 text-lg md:text-base sm:text-sm text-[#696984]"
            >
              {t("aboutusContent5")}
            </motion.p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
