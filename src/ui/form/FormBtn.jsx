function FormBtn({ children, disable, onClick, className = "" }) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`bg-amber-400 py-2 px-4 w-[100%] rounded-md text-stone-100 font-semibold hover:bg-amber-500 transition-all  ${className} `}
    >
      {children}
    </button>
  );
}

export default FormBtn;
