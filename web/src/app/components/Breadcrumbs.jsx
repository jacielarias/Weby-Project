"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiCaretRightThin } from "react-icons/pi";

const BreadCrumbs = ({ customClass, postCat, postTitle, category }) => {
  const fixingCategoryNames = (name) => {
    return decodeURIComponent(name).charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  const pathname = usePathname();

  const pathnames = pathname
    .split("/")
    .filter((x) => x && x.toLowerCase() !== "categories");

  return (
    <nav className={`w-full h-[50px] flex items-center ${customClass}`}>
      <ul className="flex items-center gap-1 w-full text-[10px] sm:text-sm md:text-base">
        <li>
          <Link href="/" className="breadcrumb-item hover:underline">
            Home
          </Link>
        </li>

        {pathnames.map((link, index) => {
          if (link === "post" && postCat?.slug && postCat?.name) {
            return (
              <React.Fragment key="post-category">
                <span className="mx-1"><PiCaretRightThin /></span>
                <li>
                  <Link
                    href={`/categories/${postCat.slug}`}
                    className="breadcrumb-item hover:underline"
                  >
                    {postCat.name}
                  </Link>
                </li>
              </React.Fragment>
            );
          }

          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={to}>
              <span className="mx-1"><PiCaretRightThin /></span>
              <li>
                {isLast ? (
                  <span className="breadcrumb-item break-words">
                    {postTitle || category || fixingCategoryNames(link)}
                  </span>
                ) : (
                  <Link href={to} className="breadcrumb-item hover:underline break-words">
                    {fixingCategoryNames(link)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
