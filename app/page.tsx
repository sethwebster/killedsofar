import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Counter from "../components/Counter";
import GenericCounter from "../components/GenericCounter";
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
            <GenericCounter animalsPerYear={data.chickens} text="Chickens" />
            <GenericCounter animalsPerYear={data.turkeys} text="Turkeys" />
            <GenericCounter animalsPerYear={data.cattle} text="Cattle" />
            <GenericCounter animalsPerYear={data.ducks} text="Ducks" />
            <GenericCounter animalsPerYear={data.sheep} text="Sheep" />
            <GenericCounter animalsPerYear={data.pigs} text="Pigs" />
            <GenericCounter animalsPerYear={data.aquatic} text="Sea Life" />
            <GenericCounter animalsPerYear={data.total} text="Total" />
          </div>
          <h1 className="text-white text-2xl text-center mt-10 drop-shadow-md">
            Since you got here
          </h1>
        </div>
      </RotatingBackgroundImageWrapper>
    </div>
  );
}
