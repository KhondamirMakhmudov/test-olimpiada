import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const faqs = [
  {
    question: "Olimpiada haqida qayerdan maʼlumot olsam boʻladi?",
    answer: (
      <>
        Olimpiada haqida{" "}
        <a
          href="https://iq-math.uz/about-olympics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://iq-math.uz/about-olympics
        </a>{" "}
        rasmiy veb-sahifasidan ma’lumot olishingiz mumkin.
      </>
    ),
  },
  {
    question: "IQMATH oʻzi nima?",
    answer:
      "IQmath — bu matematika fanini samarali oʻrganish uchun maxsus ishlab chiqilgan innovatsion elektron platforma boʻlib, unda maktab darsliklarini yaxshi oʻzlashtirishga va oliy taʼlim dargohlariga kirish imtihonlarida yuqori natijalarni qoʻlga kiritishda yordam beradi.",
  },
  {
    question:
      "IQMATH boʻyicha qiziqtirgan savollarimga qayerdan javob olsam boʻladi?",
    answer:
      "+998 (78) 888 08 00 raqamiga qoʻngʻiroq qilib istalgan savollaringizga javob olishingiz mumkin.",
  },
  {
    question: "IQMATH platformasidan kimlar roʻyxatdan oʻtishi mumkin?",
    answer:
      "IQmath platformasidan foydalanish uchun yosh chegarasi belgilanmagan. Istalgan foydalanuvchi saytdan foydalanishi mumkin. Saytdan foydalanish pullik.",
  },
  {
    question:
      "IQMATH platformasida aʼlochi foydalanuvchilar uchun bonuslar beriladimi?",
    answer:
      "IQmath platformasida berilgan topshiriqlarni oʻz vaqtida muvaffaqiyatli bajargan foydalanuvchilar uchun bonus ballari beriladi. Ushbu ballarni tez orada qimmatbaho sovgʻalarga almashtirishingiz mumkin boʻladi (Bu borada ishlar boshlangan).",
  },
];

const faq_ru = [
  {
    question: "Где можно получить информацию об Олимпиаде?",
    answer: (
      <>
        Подробную информацию об Олимпиаде можно найти на официальной
        веб-странице:{" "}
        <a
          href="https://iq-math.uz/about-olympics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://iq-math.uz/about-olympics
        </a>{" "}
      </>
    ),
  },
  {
    question: "Что такое IQMATH?",
    answer:
      "IQmath — это инновационная электронная платформа, специально разработанная для эффективного изучения математики. Она помогает лучше усваивать школьные учебники и добиваться высоких результатов на вступительных экзаменах в вузы.",
  },
  {
    question: "Где можно получить ответы на интересующие вопросы по IQMATH?",
    answer:
      "Вы можете позвонить по номеру +998 (78) 888 08 00, и специалисты ответят на все ваши вопросы.",
  },
  {
    question: "Кто может зарегистрироваться на платформе IQMATH?",
    answer:
      "Возрастных ограничений для регистрации на платформе IQmath нет. Любой пользователь может воспользоваться сайтом. Доступ к платформе является платным.",
  },
  {
    question: "Предусмотрены ли бонусы для лучших пользователей IQMATH?",
    answer:
      "Пользователи, успешно выполняющие задания на платформе IQmath в установленный срок, получают бонусные баллы. В скором времени их можно будет обменять на ценные призы (данный процесс уже запущен).",
  },
];

const Index = () => {
  const { t, i18n } = useTranslation();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Header />
      <div className="container mt-[20px] md:mt-[50px]">
        <NavbarTitle />
      </div>

      {i18n.language === "uz" ? (
        <div className="container  mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto mt-10">
          {faq_ru.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Index;
