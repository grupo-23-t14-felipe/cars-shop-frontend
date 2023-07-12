import { AboutUs } from "./AboutUs";
import { useInView } from "react-intersection-observer";

export const ButtonFooter = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0
  });

  console.log(inView);

  return (
    <div
      ref={ref}
      className="px-4 sm:px-[1.875rem] lg:px-[3.75rem] pt-0 pb-11 flex flex-col gap-3 duration-300 overflow-hidden">
      {inView && (
        <>
          <AboutUs />
        </>
      )}
    </div>
  );
};
