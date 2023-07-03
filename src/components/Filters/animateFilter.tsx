export const AnimateFilter = () => {
  return (
    <div className="w-1/4 animate-pulse flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="py-2 bg-grey5 rounded-xl w-2/4"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-1/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/6"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="py-2 bg-grey5 rounded-xl w-2/4"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-1/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/3"></div>
        <div className="py-1 bg-grey5 rounded-xl w-2/6"></div>
      </div>
    </div>
  );
};
