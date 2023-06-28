import { Menu } from "@components/layout/menu";
import { ThemeToggle } from "@components/layout/theme-toggle";
import React from "react";

export function Header() {
  return (
    <div>
      <div className={"py-10  font-bold text-4xl text-neutral"}>Shopm</div>
      <div className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="navbar-start">
          <div className="px-2 mx-2">
            <span className="text-sm md:text-lg font-bold">Login</span>
          </div>
        </div>

        <div className="navbar-end">
          <div className="hidden lg:block">
            <Menu className="menu-horizontal px-1" />
          </div>
          <ThemeToggle />
          <div className="lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
