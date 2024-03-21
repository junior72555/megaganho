import React, { ReactNode } from "react";
import InputMask from "react-input-mask";

import "./styles.css";
import { formatBRL, moneyMask } from "@/utils/currency";

export interface InputProps {
  id?: string;
  type: string;
  title?: string;
  description?: string | ReactNode;
  placeholder?: string;
  defaultValue?: string;
  currency?: boolean;
  mask?: string | null;
  maskChar?: any;
  alwaysShowMask?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  disabled?: boolean;
  errors?: string;
  autoComplete?: string;
}

const Input = (
  {
    id,
    title,
    type,
    description = null,
    defaultValue,
    required,
    errors,
    currency = false,
    mask = null,
    maskChar = null,
    placeholder,
    alwaysShowMask = false,
    disabled = false,
    autoComplete = "off",
    ...rest
  }: InputProps,
  ref: any
) => {

  const setCurrencyValue = (event: React.FormEvent<HTMLInputElement>) => {
    const onlyNumbers =
      event.currentTarget.value.match(/\d/g)?.join("") ?? "";

    let finalValue = moneyMask(onlyNumbers) as number;

    let value = (currency
      ? formatBRL(finalValue)
      : finalValue) as string;

    event.currentTarget.value = value;
  };


  return (
    <div className='floating mb-3 relative'>
      {mask ? (
        <InputMask
          mask={mask}
          maskChar={maskChar}
          id={id}
          type={type}
          alwaysShowMask
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${errors && 'border-red-500 border rounded-b-none'} disabled:cursor-not-allowed bg-zinc-900 text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
          defaultValue={defaultValue}
          disabled={disabled}
          {...rest}
          ref={ref}
        />) : currency ? (
          <input
            id={id}
            type={type}
            autoComplete={autoComplete}
            placeholder={' '}
            className={`${errors && 'border-red-500 border rounded-b-none'} disabled:cursor-not-allowed bg-zinc-900 text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
            defaultValue={defaultValue}
            onKeyUp={(e) => setCurrencyValue(e)}
            disabled={disabled}
            {...rest}
            ref={ref}
          />
        ) : (
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${errors && 'border-red-500 border rounded-b-none'} disabled:cursor-not-allowed bg-zinc-900 text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
          defaultValue={defaultValue}
          disabled={disabled}
          {...rest}
          ref={ref}
        />
      )}
      <label
        className="block mb-2 uppercase text-zinc-400 text-xs font-bold absolute top-0 left-0 px-4 py-[1.35rem] h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
        htmlFor={id}
      >
        {title}
        {required && (<span className="text-red-500"> * </span>)}
      </label>

      {errors && <div className="text-xs p-1 text-white text-center font-normal bg-red-500 w-full rounded-b-md">{errors}</div>}
      {
        !errors && description && (
          <div className="mt-2 text-zinc-400 text-sm">{description}</div>
        )
      }
    </div >
  );
};

export default React.forwardRef(Input);
