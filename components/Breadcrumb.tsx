"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const names: Record<string, string> = {
    about: "About",
    recruitment: "Careers",
    secretary: "Secretary",
    news: "News",
    divisions: "Divisions",
    documents: "Resources",

    staff: "Staff Dashboard",
    dashboard: "Dashboard",
    login: "Login",

    organisation: "Organisation",
    employees: "Employees",
    users: "Staff Management",
    audit: "Audit Logs",

    create: "Create News",
    edit: "Edit Release",
};

function formatSegment(segment: string) {
    return (
        names[segment] ??
        segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
    );
}

export default function Breadcrumb() {

    const pathname = usePathname();

    const segments = pathname
        .split("/")
        .filter(Boolean);

    const crumbs = [
        {
            label: "Home",
            href: "/",
        },
        ...segments.map((segment, index) => ({
            label: formatSegment(segment),
            href: "/" + segments.slice(0, index + 1).join("/"),
        })),
    ];

    return (

        <nav className="mb-8">

            <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">

                {crumbs.map((crumb, index) => {

                    const last = index === crumbs.length - 1;

                    return (

                        <div
                            key={crumb.href}
                            className="flex items-center gap-2"
                        >

                            {last ? (

                                <span className="font-semibold text-[#003B6F]">

                                    {crumb.label}

                                </span>

                            ) : (

                                <Link
                                    href={crumb.href}
                                    className="hover:text-[#003B6F] transition"
                                >

                                    {crumb.label}

                                </Link>

                            )}

                            {!last && (
                                <span>/</span>
                            )}

                        </div>

                    );

                })}

            </div>

        </nav>

    );

}
