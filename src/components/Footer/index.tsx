import Image from "next/image";
import logo_white from "../../assets/logo_white.svg";
import { MdKeyboardArrowUp } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-grey0">
      <div className="px-[1.875rem] py-11 flex flex-col gap-[3.75rem] justify-between items-center sm:flex-row sm:gap-0 duration-300">
        <figure>
          <Image src={logo_white} alt="logo" />
        </figure>
        <p className="body-2-400 text-whiteFixed">&copy; 2022 - Todos os direitos reservados.</p>
        <a
          href="#top"
          className="w-[53px] h-[50px] rounded bg-grey1 hover:bg-grey2 duration-300 flex justify-center items-center">
          <MdKeyboardArrowUp size={24} color="white" />
        </a>
      </div>
    </footer>
  );
};
