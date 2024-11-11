import type { HTMLInputTypeAttribute } from "react";

interface StyledInputProps {
  stateVar: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  placeholder: string;
  isDark: boolean;
  type: HTMLInputTypeAttribute;
  id: string;
}

export default function StyledInput({
  stateVar,
  onChange,
  icon,
  placeholder,
  isDark,
  type,
  id,
}: StyledInputProps) {
  const inputBg = isDark ? "bg-zinc-800" : "bg-zinc-900";
  const inputBorder = isDark ? "border-zinc-700" : "border-zinc-800";

  return (
    <div className="relative">
      <div
        className={`flex w-full ${inputBorder} overflow-hidden rounded-lg border-2`}
      >
        <div
          className={`${inputBg} my-auto border-none w-12 py-1.5 text-center text-[1.125rem] leading-7`}
        >
          <span className="align-[-0.125em] inline-block">{icon}</span>
        </div>
        <input
          autoComplete="off"
          spellCheck="false"
          id={id ?? `input-${placeholder.slice(0, 10)}-${type}`}
          type={type ?? "text"}
          placeholder={placeholder}
          className={`${inputBg} block w-full pt-2 pb-2 pr-2 text-white outline-none`}
          value={stateVar}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
