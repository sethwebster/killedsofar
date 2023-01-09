"use client";
import Image, { StaticImageData } from "next/image";
import { startTransition, useCallback, useEffect, useState } from "react";
import slaughterHouseCattleBodies from "../public/images/Slaughterhouse_cattle_bodies.jpg";
import slaughterHouseFloor from "../public/images/Slaughterhouse-Floor.jpg";
import beautifulCow from "../public/images/BeautifulCow.jpg";
import lamb from "../public/images/Lamb.jpg";
import piglet from "../public/images/Piglet.jpg";
import calfBw from "../public/images/calf-bw.jpg";
import chicken1 from "../public/images/chicken1.jpg";
import cutePiglet from "../public/images/Cutepiglet.jpg";
import Rocky from "../public/images/Rocky.jpg";
import RotatingBackgroundImages from "./RotatingBackgroundImage";

interface ImageType {
  image: StaticImageData;
  credit: string;
}

const images: ImageType[] = [
  {
    image: slaughterHouseCattleBodies,
    credit: "Anonymous",
  },
  {
    image: slaughterHouseFloor,
    credit: "Anonymous",
  },
  {
    image: beautifulCow,
    credit: "Jim Champion, Flickr",
  },
  {
    image: lamb,
    credit: "Donald Macleod, Flickr",
  },
  {
    image: piglet,
    credit: "Sander van der Wel, Flickr",
  },
  {
    image: calfBw,
    credit: "Edward Dalmulder, Flickr",
  },
  {
    image: chicken1,
    credit: "cuatrok77, Flickr",
  },
  {
    image: cutePiglet,
    credit: "http://www.stanleyliew.com/2011_10_01_archive.html",
  },
  {
    image: Rocky,
    credit: "http://sethwebster.com, Seth Webster",
  },
];


export default function RotatingBackgroundImageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RotatingBackgroundImages images={images}>
      {children}
    </RotatingBackgroundImages>
  );
}
