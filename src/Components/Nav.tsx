import { motion } from "framer-motion";
import { useState } from "react";
// import ProfileMenu from "../components/UI/ProfileMenu";

const navMotion = {
  visible: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const itemMotionDesktop = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 1, x: 0 },
};

const navLinks = [
  { name: "Home", href: "MainPage", id: 1 },
  { name: "Reports", href: "ReportsPage", id: 2 },
  { name: "Collection Drive", href: "AddCollectionDrivePage", id: 3 },
  { name: "Donation Request", href: "ProcessRequestPage", id: 4 },
  { name: "Users", href: "UsersEditPage", id: 5 },
];

const NavLinks = ({
  isMobile,
  className,
}: {
  isMobile: boolean;
  className: string;
}) => (
  <div className={className}>
    {navLinks.map(({ name, href, id }) => (
      <motion.a
        key={id}
        variants={isMobile ? itemMotion : itemMotionDesktop}
        href={href}
      >
        {name}
      </motion.a>
    ))}
  </div>
);
