import Image from "next/image";
import Link from "next/link";

const Brand = () => {
  return (
    <div className={"  "}>
      <Link href={"/"}>
        <h1
          className={
            " font-semibold text-[34px]  text-[#3965c6] font-myriad dark:text-white  "
          }
        >
          IQ math
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
