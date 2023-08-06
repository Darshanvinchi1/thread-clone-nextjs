"use client";
import React from "react";
import { sidebarLinks } from "@/constants/index";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Bottombar = () => {
	const pathname = usePathname();
	return (
		<section className='bottombar'>
			<div className='bottombar_container'>
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					return (
						<Link
							className={`bottombar_link ${isActive && "bg-primary-500"}`}
							key={link.label}
							href={link.route}>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className='text-light-1 text-subtle-medium max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Bottombar;
