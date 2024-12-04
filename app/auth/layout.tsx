import { ReactNode } from "react";
import Barcode from "../svg/Barcode.svg";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-concert-background bg-cover ">
      <h1 className="font-lacquer mt-8 self-center text-8xl text-primary ">
        STAGE STORIES
      </h1>
      <div className="flex justify-center mb-4">
        <div className="bg-card1 flex w-[90%] max-w-2xl rounded-lg  border-2 border-black">
          <div className=" p-8 w-full self-center border-r-2 border-black">
            {children}
          </div>
          <Barcode />
          <div className="flex flex-col self-center">
            <p className="font-lacquer rotate-[270deg] text-lg whitespace-nowrap text-center px-5 border-t-2 border-black translate-x-10">
              Stage Stories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
