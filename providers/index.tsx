import { ReactNode } from "react";
import LenisProvider from "./lenis-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <LenisProvider>{children}</LenisProvider>;
};

export default Providers;
