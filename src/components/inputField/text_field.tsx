import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextField = {
  placeholder: string;
  type: string;
  prefix_icon?: React.ReactNode;
  surfix_icon?: React.ReactNode;
  name?: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
  subtitle?: string;
};

const TextField = ({
  placeholder,
  type,
  name,
  prefix_icon,
  surfix_icon,
  error,
  register,
  subtitle,
}: TextField) => {
  return (
    <div
      className="d-flex 
        flex-column
      align-items-start
      "
    >
      <label className="mb-2 text-capitalize text-black-variant-2">
        {name}
      </label>
      {subtitle && <p className="mb-2">{subtitle}</p>}
      <div
        className={`d-flex
  align-items-center
  input-form-control
  w-100
  ${error ? "red-border" : ""}
  `}
      >
        {prefix_icon}
        <input
          type={type}
          placeholder={placeholder}
          className="custom-input"
          {...register}
        />
        {surfix_icon ?? ""}
      </div>
      {error && <span className="text-error text-xsm">{error}</span>}
    </div>
  );
};

export default TextField;

export const TextArea = ({
  placeholder,
  name,
  prefix_icon,
  surfix_icon,
  error,
  register,
  subtitle,
}: TextField) => {
  return (
    <div
      className="d-flex 
        flex-column
      align-items-start
      "
    >
      <label className="mb-2 text-capitalize text-black-variant-2">
        {name}
      </label>
      {subtitle && <p className="mb-2">{subtitle}</p>}
      <div
        className={`d-flex
  align-items-center
  input-form-control
  w-100
  ${error ? "red-border" : ""}
  `}
      >
        {prefix_icon}
        <textarea
          style={{ maxWidth: "400px", height: "100px" }}
          rows={30}
          placeholder={placeholder}
          className="custom-input"
          {...register}
        />
        {surfix_icon ?? ""}
      </div>
      {error && <span className="text-error text-xsm">{error}</span>}
    </div>
  );
};

type TextEdit = {
  placeholder: string;
  type: string;
  prefix_icon?: React.ReactNode;
  surfix_icon?: React.ReactNode;
  name: string;
  title: string;
  error: string | undefined;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  subtitle?: string;
  value: string;
  rows?: number;
};
export const TextEdit = ({
  placeholder,
  type,
  title,
  name,
  prefix_icon,
  surfix_icon,
  error,
  onChange,
  subtitle,
  value,
}: TextEdit) => {
  return (
    <div
      className="d-flex 
        flex-column
      align-items-start
      "
    >
      <label className="mb-2 text-capitalize text-black-variant-2">
        {title}
      </label>
      {subtitle && <p className="mb-2">{subtitle}</p>}
      <div
        className={`d-flex
  align-items-center
  input-form-control
  w-100
  ${error ? "red-border" : ""}
  `}
      >
        {prefix_icon}
        <input
          type={type}
          placeholder={placeholder}
          className="custom-input"
          onChange={onChange}
          name={name}
          value={value}
        />
        {surfix_icon ?? ""}
      </div>
      {error && <span className="text-error text-xsm">{error}</span>}
    </div>
  );
};
export const TextEditArea = ({
  placeholder,
  title,
  name,
  prefix_icon,
  surfix_icon,
  error,
  onChange,
  subtitle,
  value,
  rows = 5,
}: TextEdit) => {
  return (
    <div
      className="d-flex 
        flex-column
      align-items-start
      "
    >
      <label className="mb-2 text-capitalize text-black-variant-2">
        {title}
      </label>
      {subtitle && <p className="mb-2">{subtitle}</p>}
      <div
        className={`d-flex
  align-items-center
  input-form-control
  w-100
  ${error ? "red-border" : ""}
  `}
      >
        {prefix_icon}
        <textarea
          placeholder={placeholder}
          className="custom-input"
          onChange={onChange}
          value={value}
          name={name}
          rows={rows}
        />
        {surfix_icon ?? ""}
      </div>
      {error && <span className="text-error text-xsm">{error}</span>}
    </div>
  );
};
