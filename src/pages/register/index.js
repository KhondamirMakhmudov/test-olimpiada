import { useRouter } from "next/router";
import Brand from "@/components/brand";
import Image from "next/image";
import { useState, useEffect } from "react";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useForm } from "react-hook-form";
import { regionsUz } from "@/data/region";
import { regionsRu } from "@/data/regions_ru";
import { academicLyseums } from "@/data/litsey";
import { academicLyseumsRu } from "@/data/litsey_ru";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "@/components/language";
import { motion } from "framer-motion";
import UserAgreement from "@/components/oferta";
import Header from "@/components/header";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Register = () => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState("");
  const router = useRouter();
  const [tab, setTab] = useState("register");
  const [selectedAcademicLyseums, setSelectedAcademicLyseums] = useState(null);
  const [openAcademicLyseums, setOpenAcademicLyseums] = useState(false);
  const [academic, setAcademic] = useState(false);
  // const regions = regionsUz.regions;
  // const districts = regionsUz.districts;
  const [selectedTypeOfEducation, setSelectedTypeOfEducation] = useState(null);
  const [openTypeOfEducation, setOpenTypeOfEducation] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPage, setShowPage] = useState(false);
  const [regions, setRegions] = useState(regionsUz.regions);
  const [districts, setDistricts] = useState(regionsUz.districts);

  const [dropdownOpenCourse, setDropdownOpenCourse] = useState(false);
  const [selectedOptionCourse, setSelectedOptionCourse] = useState(null);
  const [dropdownselectedDocument, setDropdownSelectedDocument] =
    useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const optionDocument = [`${t("certificate")}`, `${t("passport")}`];
  const options = [t("litsey"), t("school")];
  const optionsCourse = [
    { id: 1, name: `1-${t("course")}` },
    { id: 2, name: `2-${t("course")}` },
    { id: 3, name: `10-${t("class")}` },
    { id: 4, name: `11-${t("class")}` },
    { id: 5, name: `${t("finishedEducation")}` },
  ];

  const educationTypes = ["Русский язык", "O'zbek tili"];

  const filteredCourses =
    selectedOption === t("litsey")
      ? optionsCourse.filter((course) => [1, 2, 5].includes(course.id))
      : selectedOption === t("school")
      ? optionsCourse.filter((course) => [3, 4, 5].includes(course.id))
      : [];

  // litsey yoki maktabni tanlash
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  // kursni tanlash
  const handleCourseSelect = (course) => {
    setSelectedOptionCourse(course.name);
    setDropdownOpenCourse(false);
  };
  // passport
  const handleSelectedDocument = (document) => {
    setSelectedDocument(document);
    setDropdownSelectedDocument(false);
  };
  // viloyatni tanlash
  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedDistrict(null);
    const filterDistricts = districts.filter(
      (district) => district.region_id === regionId
    );
    setFilteredDistricts(filterDistricts);
    setRegionDropdownOpen(false);
  };
  // hududni tanlash
  const handleDistrictSelect = (districtId) => {
    setSelectedDistrict(districtId);
    setDistrictDropdownOpen(false);
  };

  const toggleDistrictDropdown = () => {
    if (filteredDistricts.length) {
      setDistrictDropdownOpen((prev) => !prev);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleTab = (tab) => {
    setTab(tab);
  };
  useEffect(() => {
    if (i18n.language === "ru") {
      setRegions(regionsRu.regions);
    } else {
      setRegions(regionsUz.regions);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (i18n.language === "ru") {
      setDistricts(regionsRu.district);
    } else {
      setDistricts(regionsUz.districts);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (i18n.language === "uz") {
      setAcademic(academicLyseums.litseyi);
    } else {
      setAcademic(academicLyseumsRu.litseyi);
    }
  }, [i18n.language]);

  const selectedRegionName =
    regions.find((r) => r.id === selectedRegion)?.name ||
    `${t("chooseRegion")}`;
  const selectedDistrictName =
    filteredDistricts.find((d) => d.id === selectedDistrict)?.name ||
    (filteredDistricts.length ? `${t("chooseDistrict")}` : `${t("noRegion")}`);

  const { mutate: registerRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.register,
  });

  const watchedValues = watch([
    "full_name",
    "email",
    "phone",
    "address",
    "academy_or_school_name",
    "documentPrefix",
    "documentNumber",
  ]);

  const isFormValid =
    watchedValues.every((value) => value?.trim() !== "") &&
    selectedRegionName &&
    selectedDistrictName &&
    selectedTypeOfEducation &&
    selectedOption &&
    selectedOptionCourse;

  const onSubmit = ({
    full_name,
    email,
    phone,
    address,
    academy_or_school_name,
    documentPrefix,
    documentNumber,
  }) => {
    let formData = new FormData();
    const fullDocument = `${documentPrefix}${documentNumber}`;
    const formattedDate = date.toISOString().split("T")[0];
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone", `${String(998) + String(phone)}`);
    formData.append("region", selectedRegionName);
    formData.append("districts", selectedDistrictName);
    formData.append("address", address);
    formData.append("brithday", formattedDate);
    formData.append("academy_or_school", selectedOption);
    formData.append("class_name", selectedOptionCourse);
    formData.append("document_type", selectedDocument),
      formData.append("type_of_education", selectedTypeOfEducation),
      formData.append("document", fullDocument),
      formData.append("academy_or_school_name", academy_or_school_name),
      registerRequest(
        {
          url: URLS.register,
          attributes: formData,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");
            router.push(`/auth/recieve-code/${phone}`);
          },
          onError: (error) => {
            console.log("Full error response:", error.response?.data);

            if (error.response?.data?.errors) {
              const errors = error.response.data.errors;

              // setSubmitError({
              //   phone: errors.phone?.[0] || null,
              //   email: errors.email?.[0] || null,
              //   document: errors.document?.[0] || null,
              // });

              toast.error(Object.values(errors).flat().join("\n"));
            } else {
              console.log("error occured");
            }
          },
        }
      );
  };

  const {
    data: registerDate,
    isLoading: isLoadingRegisterDate,
    isFetching: isFetchingRegisterDate,
  } = useGetQuery({
    key: KEYS.registerDate,
    url: URLS.registerDate,
  });

  useEffect(() => {
    const now = new Date();
    const startDate = new Date(get(registerDate, "data[0].start_date"));
    const endDate = new Date(get(registerDate, "data[0].end_date"));

    if (now >= startDate && now <= endDate) {
      setShowPage(true);
    } else {
      setShowPage(false);
    }
  }, [registerDate]);

  return (
    <div
      className="bg-no-repeat bg-center bg-cover min-h-screen flex flex-col"
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
    >
      <Header />
      <div className={" flex flex-grow items-center justify-center "}>
        {submitError && (
          <p className="text-red-500 text-sm mt-1">
            {Object.entries(submitError)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </p>
        )}

        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto bg-white  mx-auto md:my-[30px] my-[50px] rounded-[8px] p-6 md:p-8  ">
          {/* <div className="mb-[30px]  text-center">
            <Brand />
          </div> */}

          <div className="flex">
            <button
              onClick={() => {
                handleTab("login");
                router.push("/");
              }}
              className={`py-[8px] px-[16px]  w-1/3  ${
                tab === "login"
                  ? "bg-[#5D87FF] text-white"
                  : "text-[#5A6A85] hover:bg-[#ECF2FF]"
              } rounded-[4px] capitalize text-lg active:scale-90 scale-100 transition-all duration-300`}
            >
              {t("login")}
            </button>

            <button
              onClick={() => {
                handleTab("register");
                router.push("/register");
              }}
              className={`py-[8px] px-[16px]  w-2/3  ${
                tab === "register"
                  ? "bg-[#5D87FF] text-white"
                  : "text-[#5A6A85] hover:bg-[#ECF2FF]"
              } rounded-[4px] active:scale-90 scale-100 transition-all duration-300`}
            >
              {t("sign in")}
            </button>
          </div>

          <div className="w-full mt-[30px]">
            {showPage ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-[10px] border p-[16px] rounded-[4px]"
              >
                {/* Ism */}
                <div className="">
                  <input
                    type="text"
                    {...register("full_name", { required: true })}
                    className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                    placeholder={`${t("full name")}`}
                  />
                </div>
                {/* Email */}
                <div>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                    placeholder={`${t("email")}`}
                  />
                  {submitError?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {submitError.email}
                    </p>
                  )}
                </div>
                {/* Telefon raqam */}
                <div>
                  <div className="border border-[#EAEFF4] flex gap-x-[10px] items-center rounded-[8px] px-[8px]">
                    <Image
                      src={"/icons/uzb-flag.svg"}
                      alt="flag"
                      width={30}
                      height={30}
                    />
                    <div className="w-[1px] h-[40px] bg-[#EAEFF4]"></div>
                    <span className="text-[#2A3547] text-sm">+998</span>
                    <input
                      type="tel"
                      maxLength="9"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full text-sm bg-white text-[#2A3547] py-[9px] pl-[5px]"
                      placeholder="---------"
                    />
                  </div>
                  {submitError?.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {submitError.phone}
                    </p>
                  )}
                </div>
                {/* Birthday */}
                <div className="w-full cursor-pointer">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText={`${t("birthday")}`}
                    className="border p-2 rounded w-full"
                    minDate={new Date(2004, 12, 1)}
                    maxDate={new Date(2010, 11, 31)}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={6}
                    showMonthDropdown
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Passport yoki guvohnoma */}

                <div className="relative text-[#2A3547] cursor-pointer">
                  <div
                    onClick={() => setDropdownSelectedDocument((prev) => !prev)}
                    className="w-full  px-4 py-2 border border-[#EAEFF4] text-[#2A3547] rounded-md bg-white focus:outline-none flex items-center justify-between"
                  >
                    <span>
                      {selectedDocument || `${t("selectTypeOfPassport")}`}
                    </span>
                    <svg
                      className={`w-5 h-5 transform ${
                        dropdownselectedDocument ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {dropdownselectedDocument && (
                    <ul className="absolute w-full mt-1 bg-white text-[#2A3547] border border-gray-300 rounded-md shadow-md z-10">
                      {optionDocument.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectedDocument(option)}
                        >
                          {t(option)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {selectedDocument === null ? (
                  ""
                ) : (
                  <motion.div
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-x-[5px]">
                      <input
                        type="text"
                        maxLength={2}
                        {...register("documentPrefix", {
                          required: "To'ldirilishi shart",
                          pattern: {
                            value: /^[A-Z]{2}$/,
                            message: "Ikkita katta harf bo'lishi kerak",
                          },
                        })}
                        onChange={(e) => {
                          const value = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z]/g, ""); // Convert to uppercase & remove non-letters
                          setValue("documentPrefix", value); // Update field value
                        }}
                        className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-16 px-3 py-2 text-center"
                        placeholder="AB"
                      />

                      {/* Number (5462312) Input */}
                      <input
                        type="text"
                        maxLength={7}
                        {...register("documentNumber", {
                          required: "To'ldirilishi shart",
                          pattern: {
                            value: /^[0-9]{7}$/,
                            message: "7 ta raqam bo'lishi kerak",
                          },
                        })}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        }}
                        onChange={(e) =>
                          setValue(
                            "document",
                            (watch("documentPrefix") || "") + e.target.value
                          )
                        }
                        className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-3 py-2"
                        placeholder="1234567"
                      />
                    </div>

                    {errors.documentPrefix && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.documentPrefix.message}
                      </p>
                    )}

                    {errors.documentNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.documentNumber.message}
                      </p>
                    )}
                  </motion.div>
                )}

                <div className="space-y-4 text-[#2A3547]">
                  <div className="relative">
                    <div
                      onClick={() => setRegionDropdownOpen((prev) => !prev)}
                      className="w-full  border border-[#EAEFF4] px-4 py-2 rounded-md bg-white cursor-pointer flex justify-between items-center"
                    >
                      <p className="text-[#2A3547]">{selectedRegionName}</p>
                      <svg
                        className={`w-5 h-5 transform duration-200 ${
                          regionDropdownOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {regionDropdownOpen && (
                      <div className="absolute z-50 -top-[370px] mt-1 w-full bg-white border h-[400px] overflow-y-scroll rounded-md shadow-md">
                        {regions.map((region) => (
                          <div
                            key={region.id}
                            className="px-4 py-2 hover:bg-gray-100 text-[#2A3547] cursor-pointer"
                            onClick={() => handleRegionSelect(region.id)}
                          >
                            {region.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedRegion === null ? (
                    ""
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, translateY: "30px" }}
                      animate={{ opacity: 1, translateY: "0px" }}
                      transition={{ duration: 0.3 }}
                      className="relative text-[#2A3547]"
                    >
                      <div
                        onClick={toggleDistrictDropdown}
                        className={`w-full  border border-[#EAEFF4] px-4 py-2 rounded-md bg-white flex justify-between items-center ${
                          !filteredDistricts.length ? "cursor-not-allowed" : ""
                        }`}
                        disabled={!filteredDistricts.length}
                      >
                        <p className="text-[text-[#2A3547]]">
                          {selectedDistrictName}
                        </p>
                        <svg
                          className={`w-5 h-5 transform duration-200 ${
                            districtDropdownOpen ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {districtDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                          {filteredDistricts.map((district) => (
                            <div
                              key={district.id}
                              className="px-4 py-2 hover:bg-gray-100 text-[#2A3547] cursor-pointer"
                              onClick={() => handleDistrictSelect(district.id)}
                            >
                              {district.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
                {/* Manzil */}
                <div className="">
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                    placeholder={`${t("address")}`}
                  />
                </div>

                {/* Ta'lim dargohi */}
                <div className="relative text-[#2A3547] cursor-pointer">
                  <div
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-full  px-4 py-2 border border-[#EAEFF4] text-[#2A3547] rounded-md bg-white focus:outline-none flex items-center justify-between"
                  >
                    <span>{selectedOption || `${t("chooseEducation")}`}</span>
                    <svg
                      className={`w-5 h-5 transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {dropdownOpen && (
                    <ul className="absolute w-full mt-1 bg-white text-[#2A3547] border border-gray-300 rounded-md shadow-md z-10">
                      {options.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  {selectedOption === `${t("school")}` ? (
                    <input
                      type="number"
                      placeholder={`${t("schoolNumber")}`}
                      {...register("academy_or_school_name", {
                        required: true,
                      })}
                      className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                    />
                  ) : selectedOption === `${t("litsey")}` ? (
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={selectedAcademicLyseums || ""}
                        {...register("academy_or_school_name", {
                          required: true,
                        })}
                        className="hidden"
                      />
                      <div
                        className="border border-[#EAEFF4] bg-white text-[#2A3547] flex justify-between items-center rounded-[8px] cursor-pointer w-full px-[15px] py-[8px]"
                        onClick={() =>
                          setOpenAcademicLyseums(!openAcademicLyseums)
                        }
                      >
                        <span>
                          {selectedAcademicLyseums || `${t("litseyName")}`}
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {openAcademicLyseums && (
                        <div className="absolute mt-1 w-full bg-white border shadow-md max-h-60 overflow-y-auto rounded-md z-50">
                          {academic.map((lyceum, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setSelectedAcademicLyseums(lyceum);
                                setOpenAcademicLyseums(false);
                                setValue("academy_or_school_name", lyceum);
                              }}
                            >
                              {lyceum}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {selectedAcademicLyseums === null &&
                watch("academy_or_school_name")?.trim() === "" ? (
                  ""
                ) : (
                  <motion.div
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.3 }}
                    className="relative text-[#2A3547] cursor-pointer"
                  >
                    <div
                      onClick={() => setDropdownOpenCourse((prev) => !prev)}
                      className="w-full text-left px-4 py-2 border border-[#EAEFF4] rounded-md bg-white focus:outline-none flex items-center justify-between"
                    >
                      <span>
                        {selectedOptionCourse || `${t("chooseTypeOfClass")}`}
                      </span>
                      <svg
                        className={`w-5 h-5 transform ${
                          dropdownOpenCourse ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {/* Dropdown options */}
                    {dropdownOpenCourse && (
                      <ul className="absolute w-full -top-[90px] bg-white border border-gray-300 rounded-md shadow-md z-50">
                        {filteredCourses.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCourseSelect(option)}
                          >
                            {option.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}

                {/* Ta'lim turi */}

                <div className="relative w-full">
                  {/* Tanlangan ta'lim turi yoki default "Ta'lim turi" */}
                  <div
                    onClick={() => setOpenTypeOfEducation(!openTypeOfEducation)}
                    className="w-full flex items-center justify-between cursor-pointer px-4 py-2 border border-[#EAEFF4] rounded-lg shadow-sm bg-white"
                  >
                    {selectedTypeOfEducation || `${t("LangOfEducation")}`}
                    <svg
                      className={`w-5 h-5 transform duration-200 ${
                        openTypeOfEducation ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {openTypeOfEducation && (
                    <ul className="absolute left-0 mt-2 w-full border border-gray-300 bg-white shadow-md rounded-lg z-10">
                      {educationTypes.map((type) => (
                        <li
                          key={type}
                          onClick={() => {
                            setSelectedTypeOfEducation(type);
                            setOpenTypeOfEducation(false);
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                            selectedTypeOfEducation === type ? "font-bold" : ""
                          }`}
                        >
                          {type}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <UserAgreement />

                <button
                  className={` ${
                    isFormValid
                      ? "bg-[#5D87FF] hover:bg-[#4570EA] text-white"
                      : "bg-gray-400 cursor-not-allowed text-white"
                  } transition-all duration-300  py-[8px] px-[16px] w-full rounded-[4px]`}
                >
                  {t("enter")}
                </button>
              </form>
            ) : (
              "Ro'yxatdan o'ta olmaysiz"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
