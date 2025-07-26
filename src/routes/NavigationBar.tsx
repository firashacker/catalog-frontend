import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //faBoxesPacking,
  faStore,
  //faSackDollar,
  faFolder,
  faBox,
  faCircleUser,
  faSignOut,
  //faMoneyBill,
  //faBucket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/user/user";

export interface element {
  id: number;
  title: string;
  path: string;
  icon: any;
}

const defaultNavElements: element[] = [
  {
    id: 8,
    title: "login",
    path: "/login",
    icon: faCircleUser,
  },
  /*  {
    id: 5,
    title: "كشف مبيعات",
    path: "/statement",
    icon: faSackDollar,
  },
  {
    id: 6,
    title: "المصروفات",
    path: "/bills",
    icon: faMoneyBill,
  },
  {
    id: 2,
    title: "المبيعات",
    path: "/orders",
    icon: faBoxesPacking,
  },*/
  {
    id: 1,
    title: "catalog",
    path: "/",
    icon: faStore,
  },
];

const adminNavElements: element[] = [
  {
    id: 8,
    title: "logout",
    path: "/logout",
    icon: faSignOut,
  },
  {
    id: 4,
    title: "الاصناف",
    path: "/categories",
    icon: faFolder,
  },
  {
    id: 3,
    title: "المنتجات",
    path: "/products",
    icon: faBox,
  },
  /*  {
    id: 5,
    title: "كشف مبيعات",
    path: "/statement",
    icon: faSackDollar,
  },
  {
    id: 6,
    title: "المصروفات",
    path: "/bills",
    icon: faMoneyBill,
  },
  {
    id: 2,
    title: "المبيعات",
    path: "/orders",
    icon: faBoxesPacking,
  },*/
  {
    id: 1,
    title: "catalog",
    path: "/",
    icon: faStore,
  },
];

function Navbar() {
  const [menu, setMenu] = useState("hidden");
  const pathname = useLocation().pathname;
  const [barElements, setBarElements] = useState<element[]>();
  const isAdmin = useUserStore((state) => state.isAdmin);
  const showMenu = () => {
    if (menu === "hidden") setMenu("");
    else setMenu("hidden");
  };

  useEffect(() => {
    if (isAdmin) setBarElements(adminNavElements);
    else setBarElements(defaultNavElements);
  }, [isAdmin]);

  return (
    <>
      <nav
        id="navbar"
        className="bg-white shadow-lg w-full z-10  fixed   top-0 left-0 right-0 h-18 "
      >
        <div className="container mx-auto flex justify-between items-center px-4 py-3 md:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-purple-700 transition-colors duration-200"
          >
            {import.meta.env.VITE_SELLPOINT}
          </Link>

          {/* Desktop Navigation Items - hidden on small screens */}
          <ul className=" hidden  xl:flex  mt-3 space-x-6 space-y-6 ">
            {barElements &&
              barElements.map((navElement) => (
                <li key={navElement.id}>
                  <Link
                    to={navElement.path}
                    className={` text-black py-2  px-4 rounded hover:opacity-90 transition duration-300  font-semibold
                  ${
                    pathname == navElement.path
                      ? "bg-gradient-to-r from-blue-500 to-purple-600" //"text-blue font-extrabold border-transparent border-b-blue-600 border-0 border-b-2"
                      : ""
                  }`}
                  >
                    <FontAwesomeIcon
                      icon={navElement.icon}
                      size="lg"
                      className="mr-1"
                    />
                    {navElement.title}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Mobile menu button for small screens */}
          <button
            type="button"
            onClick={showMenu}
            className="xl:hidden  text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 8h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (hidden by default, shown on small screens) */}
      <ul
        className={`${menu} xl:hidden bg-white shadow-md  z-20 w-auto top-20 right-0  flex-col m-8 p-8 px-full fixed `}
      >
        {barElements &&
          barElements.map((navElement) => (
            <li
              key={navElement.id}
              className={` flex py-3  border-gray-100 px-4 rounded hover:opacity-90 transition duration-300 font-semibold
          ${
            pathname === navElement.path
              ? "bg-gradient-to-r from-blue-500 to-purple-600" //"text-blue font-extrabold border-transparent border-b-blue-600 border-0 border-b-2"
              : ""
          }`}
            >
              <Link
                onClick={showMenu}
                to={navElement.path}
                className={` text-xl font-semibold text-gray-700 w-full h-full`}
              >
                <FontAwesomeIcon
                  icon={navElement.icon}
                  size="lg"
                  className="mr-1"
                />
                {navElement.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Navbar;
