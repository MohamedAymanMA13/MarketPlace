import { FBIcon, InstagramIcon, TwitterIcon, YTIcon } from "components/Icons";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="p-4 md:p-8 lg:p-10 bg-white ltr:font-poppins rtl:font-noto flex items-start md:items-center">
        <div className="flex flex-col md:flex-row items-start w-full md:items-center md:gap-8 lg:gap-16">
          <Link href="/">
            <a className="block relative h-8 w-20 lg:h-10 lg:w-28">
              <Image
                alt="company logo"
                src="/logo1.png"
                layout="fill"
                className="object-contain"
              />
            </a>
          </Link>

          <div className="mt-6 md:mt-0 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-copy text-xs lg:text-sm font-medium">
            <Link href="/about-us">
              <a className="hover:text-main">{t("About Us")}</a>
            </Link>

            <Link href="/contact-us">
              <a className="hover:text-main">{t("Contact Us")}</a>
            </Link>

            <Link href="/terms-conditions">
              <a className="hover:text-main">{t("Terms & Conditions")}</a>
            </Link>
            <Link href="/FAQ">
              <a className="hover:text-main">{t("FAQ")}</a>
            </Link>
          </div>
        </div>

        <div className="flex gap-5 items-center text-copy">
          <a href="https://facebook.com">
            <FBIcon />
          </a>
          <a href="https://facebook.com">
            <InstagramIcon />
          </a>
          <a href="https://facebook.com">
            <TwitterIcon />
          </a>
          <a href="https://facebook.com">
            <YTIcon />
          </a>
        </div>
      </div>

      <div className="py-2 bg-main w-full text-center text-white text-xs ltr:font-poppins rtl:font-noto">
        {t("All rights reserved. Madar")} ©{" "}
        <span className="font-medium">2022</span>
      </div>
    </>
  );
};

export default Footer;
