function FormBtn({ children, disable, onClick }) {
  return (
    <button disabled={disable} onClick={onClick} className="">
      {children}
    </button>
  );
}

export default FormBtn;
