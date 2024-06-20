const Spinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="from-brand-600 to-brand-600 h-24 w-24 animate-spin rounded-full bg-gradient-to-br via-transparent">
      <div className="absolute left-0 top-0 ml-1 mt-1 h-2 w-2 rounded-full bg-[#e50914]"></div>
    </div>
  </div>
);

export default Spinner;
