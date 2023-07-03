export const AnimateCard = () => {
  return (
    <div className="max-w-[312px] animate-pulse w-full min-w-[290px] flex flex-col gap-4">
      <div className="h-[152px] bg-grey5"></div>
      <div className="py-1 bg-grey5 rounded-xl w-full"></div>
      <div className="py-1 bg-grey5 rounded-xl w-2/5"></div>
      <div className="py-1 bg-grey5 rounded-xl w-2/3"></div>
      <div className="flex gap-4 justify-between items-center w-full">
        <div className="flex gap-2 w-full">
          <div className="py-2 bg-grey5 rounded-xl w-2/6"></div>
          <div className="py-2 bg-grey5 rounded-xl w-2/6"></div>
        </div>
        <div className="py-2 bg-grey5 rounded-xl w-2/4"></div>
      </div>
    </div>
  );
};
