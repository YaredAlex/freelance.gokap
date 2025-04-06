import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextFieldProb = {
  placeholder: string;
  type: string;
  prefix_icon?: React.ReactNode;
  surfix_icon?: React.ReactNode;
  name?: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
  subtitle?: string;
};

export const TextFieldRow = ({
  placeholder,
  type,
  name,
  prefix_icon,
  surfix_icon,
  error,
  register,
  subtitle,
}: TextFieldProb) => {
  return (
    <div
      className="d-flex 
        flex-row
      align-items-start
      "
    >
      <div>
        <label className="mb-2 text-capitalize text-black-variant-2">
          {name}
        </label>
        {subtitle && <p className="mb-2">{subtitle}</p>}
      </div>
      {/*  */}
      <div>
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
      {/*  */}
    </div>
  );
};

export const TextAreaRow = ({
  placeholder,
  name,
  prefix_icon,
  surfix_icon,
  error,
  register,
  subtitle,
}: TextFieldProb) => {
  return (
    <div
      className="d-flex 
        flex-row
      align-items-start
      "
    >
      <div>
        <label className="mb-2 text-capitalize text-black-variant-2">
          {name}
        </label>
        {subtitle && <p className="mb-2">{subtitle}</p>}
      </div>
      {/*  */}
      <div>
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
    </div>
  );
};

type TextEdit = {
  placeholder?: string;
  type?: string;
  prefix_icon?: React.ReactNode;
  surfix_icon?: React.ReactNode;
  name: string;
  title: string;
  error: string | undefined;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  subtitle?: string;
  value: string;
  rows?: number;
  min?: string;
  max?: string;
};
export const TextEditRow = ({
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
  min,
  max,
}: TextEdit) => {
  return (
    <div
      className="d-flex 
        flex-md-row
        gap-4
      flex-column
      align-items-start
      "
    >
      <div className="col-md-3 col">
        <label className="mb-2 text-capitalize text-black-variant-2">
          {title}
        </label>
      </div>
      {/*  */}
      <div className="col-md col-12">
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
            min={min}
            max={max}
          />
          {surfix_icon ?? ""}
        </div>
        {subtitle && (
          <p className="mb-0 text-sm text-black-variant-2">{subtitle}</p>
        )}
        {error && <span className="text-error text-xsm">{error}</span>}
      </div>
    </div>
  );
};
export const TextEditAreaRow = ({
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
        flex-md-row
        gap-4
      flex-column
      align-items-start
      
      "
    >
      <div className="col-md-3 col">
        <label className="mb-2 text-capitalize text-black-variant-2">
          {title}
        </label>
      </div>
      {/*  */}
      <div className="col-md col-12">
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
        {subtitle && (
          <p className="mb-0 text-sm text-black-variant-2">{subtitle}</p>
        )}
        {error && <span className="text-error text-xsm">{error}</span>}
      </div>
    </div>
  );
};
type WithCategory = {
  category: string[];
};
type TextEditWithCategory = TextEdit & WithCategory;
// select dropdown
export const SelectEditRow = ({
  title,
  name,
  prefix_icon,
  surfix_icon,
  error,
  onChange,
  subtitle,
  value,
  category,
}: TextEditWithCategory) => {
  return (
    <div
      className="d-flex 
          flex-md-row
          gap-4
        flex-column
        align-items-start
        "
    >
      <div className="col-md-3 col">
        <label className="mb-2 text-capitalize text-black-variant-2">
          {title}
        </label>
      </div>
      {/*  */}
      <div className="col-md col-12">
        <div
          className={`d-flex
    align-items-center
    input-form-control
    w-100
    ${error ? "red-border" : ""}
    `}
        >
          {prefix_icon}
          <select
            className="custom-input"
            onChange={onChange}
            name={name}
            value={value}
          >
            <option value={"select"}>Select Category</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {surfix_icon ?? ""}
        </div>
        {subtitle && (
          <p className="mb-0 text-sm text-black-variant-2">{subtitle}</p>
        )}
        {error && <span className="text-error text-xsm">{error}</span>}
      </div>
    </div>
  );
};
