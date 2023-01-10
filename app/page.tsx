import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import AdditionalCounters from "../components/AdditionalCounters";
import Counter from "../components/Counter";
import GenericCounter from "../components/GenericCounterDisplay";
import RotatingBackgroundImageWrapper from "../components/RotatingBackgroundImageWrapper";
import data from "../data";

export const revalidate = 60

export default function LandingPage() {
  return (
    <div>
      <RotatingBackgroundImageWrapper>
        <div className="flex justify-center flex-col w-full h-full">
          <div className="text-center text-white font-2xl">
            <Counter />
          </div>
          <div className="flex flex-row flex-wrap w-full mt-10">
            <AdditionalCounters />
          </div>
          <h1 className="text-white text-2xl text-center mt-10 drop-shadow-md">
            Since you got here
          </h1>
        </div>
      </RotatingBackgroundImageWrapper>
    </div>
  );
}
