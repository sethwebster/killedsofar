"use client";
import FPSCounter from "@sethwebster/react-fps-counter";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import GlobalTimeCoordinator from "./GlobalTimeCoordinator";

const WrappedImage = ({ image, credit, visible = true }: ImageType & { visible?: boolean }) => {
  return (
    <div className={`absolute w-full h-full z-0 ${visible ? '' : 'opacity-0'}`}>
      <Image
        src={image}
        alt={credit}
        className="object-cover w-full h-full"
        width={1920 * 2}
        height={1080 * 2}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="text-xs drop-shadow-sm text-white absolute bottom-0 left-0 p-5">
        {credit}
      </div>
    </div>
  );
};

export default function RotatingBackgroundImages({
  images,
  children,
}: {
  images: ImageType[];
  children: React.ReactNode | React.ReactNode[];
}) {
  const [imageIndex, setImageIndex] = useState(0);

  const tick = useCallback(()=>{
    setImageIndex((imageIndex) => (imageIndex + 1) % images.length);
  },[images.length]);

  const nextImageIndex = (imageIndex + 1) % images.length;
  
  return (
    <div className="h-full w-full">
      <GlobalTimeCoordinator onSignalRaised={tick} signalOn="seconds" signalValue={5} skipFirst/>
      <WrappedImage {...images[imageIndex]} visible={true} />
      <WrappedImage {...images[nextImageIndex]} visible={false} />
      <div className="absolute w-full h-full z-10">{children}</div>
    </div>
  );
}

