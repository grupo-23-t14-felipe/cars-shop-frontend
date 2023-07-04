export const LoadingAnimate = () => {
  return (
    <div className="min-h-screen animate-pulse flex flex-col lg:flex-row gap-8 py-12 px-3 bg-grey8">
      <div className="max-w-[78rem] w-full px-3 mx-auto relative">
        <div className="flex flex-col gap-8 w-full">
          <div className="h-[355px] w-full bg-grey6 rounded flex justify-center items-center overflow-hidden cursor-pointer lg:max-w-[61.5%]">
            <div className="h-full w-9/12 bg-grey4"></div>
          </div>
          <div className="p-7 sm:px-11 bg-grey6 rounded flex flex-col gap-8 lg:max-w-[61.5%]">
            <div className="bg-grey3 py-2 w-7/12 rounded"></div>

            <div className="flex flex-col gap-9 sm:justify-between sm:flex-row">
              <div className="flex gap-3">
                <div className="rounded py-4 w-14 bg-brand3"></div>
                <div className="rounded py-4 w-14 bg-brand3"></div>
              </div>

              <div className="rounded py-2 w-36 bg-grey3"></div>
            </div>

            <div className="btn-brand1-big py-5 w-32"></div>
          </div>

          <div className="py-9 px-7 sm:px-11 lg:mt-6 bg-grey6 rounded flex flex-col gap-8 lg:max-w-[61.5%]">
            <div className="bg-grey3 py-3 w-36 rounded"></div>

            <div className="flex flex-col gap-2">
              <div className="bg-grey4 py-2 w-full rounded"></div>
              <div className="bg-grey4 py-2 w-full rounded"></div>
              <div className="bg-grey4 py-2 w-8/12 rounded"></div>
            </div>
          </div>
        </div>

        <div className="lg:max-w-[440px] lg:w-[35.5%] flex flex-col gap-8 mb-16 lg:absolute lg:right-0 lg:top-0">
          <div className="bg-grey6 rounded p-9 flex flex-col">
            <div className="bg-grey4 py-3 w-20 rounded mb-9"></div>
            <div className="flex flex-wrap justify-evenly gap-x-1.5 gap-y-12 w-full ">
              <div className="bg-grey5 rounded w-[108px] h-[108px]"></div>
              <div className="bg-grey5 rounded w-[108px] h-[108px]"></div>
              <div className="bg-grey5 rounded w-[108px] h-[108px]"></div>
            </div>
          </div>

          <div className="flex flex-col bg-grey6 rounded py-10 px-7 gap-7 items-center max-h-[905px]">
            <div className="flex flex-col gap-7 items-center justify-center">
              <div className="w-[77px] h-[77px] rounded-full bg-brand2"></div>
              <div className="bg-grey4 py-2 w-36 rounded"></div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="bg-grey4 h-2 w-full rounded"></div>
              <div className="bg-grey4 h-2 w-11/12 rounded"></div>
              <div className="bg-grey4 h-2 w-7/12 rounded"></div>
            </div>

            <div className="rounded max-w-[206px] w-full h-12 btn-gray1-big  bg-grey3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
