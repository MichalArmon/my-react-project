function Input({ type, name, label, required, onChange, placeholder, value }) {
  return (
    <input
      className="w-48 p-[10px] border border-amber-400 rounded bg-white/80 placeholder:text-sm placeholder:text-stone-400"
      label={label}
      name={name}
      required={required}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default Input;
