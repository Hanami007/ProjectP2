import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import axios from "axios";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth ? auth.user : null;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [hasStore, setHasStore] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get(route("user.store")).then((response) => {
                setHasStore(!!response.data);
            });
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("homepage.index")}
                                    active={route().current("homepage.index")}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                >
                                    Homepage
                                </NavLink>
                                {hasStore ? (
                                    <>
                                        <NavLink
                                            href={route("mystore")}
                                            active={route().current("mystore")}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                        >
                                            My Store
                                        </NavLink>
                                        <NavLink
                                            href={route("orders.pending")}
                                            active={route().current("orders.pending")}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                        >
                                            Order Pending
                                        </NavLink>
                                    </>
                                ) : (
                                    <NavLink
                                        href={route("stores.create")}
                                        active={route().current("stores.create")}
                                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                    >
                                        Create Store
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {user && (
                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:text-blue-400"
                                                >
                                                    <img
                                                        src={
                                                            user?.Picture
                                                                ? `/storage/${user.Picture}`
                                                                : "/path/to/default-image.jpg"
                                                        }
                                                        alt="Profile"
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route("profile.show")}>
                                                Profile Details
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("profile.orders")}>
                                                User Orders
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("profile.edit")}>
                                                Setting Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        )}

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("homepage.index")}
                            active={route().current("homepage.index")}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            Homepage
                        </ResponsiveNavLink>
                        {hasStore ? (
                            <>
                                <ResponsiveNavLink
                                    href={route("mystore")}
                                    active={route().current("mystore")}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                >
                                    My Store
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("orders.pending")}
                                    active={route().current("orders.pending")}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                >
                                    Order Pending
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <ResponsiveNavLink
                                href={route("stores.create")}
                                active={route().current("stores.create")}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            >
                                Create Store
                            </ResponsiveNavLink>
                        )}
                    </div>

                    {user && (
                        <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.show")}>
                                    Profile Details
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("profile.orders")}>
                                    User Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Setting Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
