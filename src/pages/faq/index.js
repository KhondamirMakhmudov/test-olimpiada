import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="container mt-[20px] md:mt-[50px]">
        <NavbarTitle />
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="container flex flex-col justify-center items-start mt-[20px] md:mt-[50px]"
        >
          {/* Question Section */}
          <div className="flex  gap-x-[15px] md:gap-x-[30px] items-start">
            <Image
              src={`/images/ask-${index + 1}.png`}
              alt={`ask-${index + 1}`}
              width={50}
              height={50}
            />
            <TitleLittleContent>
              {" "}
              {t(`question${index + 1}`)}{" "}
            </TitleLittleContent>
          </div>

          {/* Answer Section */}
          <div className="flex  gap-x-[15px] md:gap-x-[30px] items-start ml-0 md:ml-[30px] mt-[15px]">
            <Image
              src={"/images/answer-human.png"}
              alt="answer-human"
              width={50}
              height={50}
            />
            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-sm md:text-lg"
            >
              {t(`answer${index + 1}`)}
              {index === 0 && (
                <Link
                  href={"https://iq-math.uz/about-olympics"}
                  className="text-[#3965c6]"
                >
                  https://iq-math.uz/about-olympic
                </Link>
              )}
            </motion.p>
          </div>

          {/* Divider */}
          <div className="container w-full h-[1px] bg-[#EAEFF4] my-[20px] md:my-[50px]"></div>
        </div>
      ))}
    </>
  );
};

export default Index;
