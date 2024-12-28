/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { E164Number } from "libphonenumber-js/core";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import Icon from "./icons";

import { FocusEvent } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { SliderInput } from "./slider-input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export enum FormFieldType {
  INPUT = "input",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  SLIDER = "slider",
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (value: string | number | boolean | Date | null) => void;
  formItemCustomClasses?: string;
  iconType?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  fieldCustomClasses?: string;
  inputCustomClasses?: string;
  labelCustomClasses?: string;
  iconCustomClasses?: string;
  iconLightColor?: string;
  iconDarkColor?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  value?: string;
  defaultValue?: string | number | boolean | null;
}

const RenderField = ({
  field,
  props,
  passwordVisibility,
  setPasswordVisibility,
}: {
  field: any;
  props: CustomProps;
  passwordVisibility: boolean;
  setPasswordVisibility: (value: boolean) => void;
}) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    description,
    onFocus,
    onBlur,
    iconAlt,
    disabled,
    fieldCustomClasses,
    inputCustomClasses,
    iconCustomClasses,
    iconLightColor,
    iconDarkColor,
    iconType,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    value,
    defaultValue,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
    case FormFieldType.EMAIL:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <Input
              {...field}
              type={fieldType}
              placeholder={placeholder}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultValue}
              className={` ${inputCustomClasses}`}
              disabled={disabled}
              autoComplete={"off"}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.PASSWORD:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <div className="relative border-none outline-none w-full flex items-center">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"} // Cambia dinámicamente
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                defaultValue={defaultValue}
                className={`${inputCustomClasses}`}
                disabled={disabled}
                autoComplete="current-password"
              />
              <Button
                type="button"
                className="absolute right-2 p-0"
                variant="inherit"
                title="Mostrar/ocultar contraseña"
                onClick={() => setPasswordVisibility(!passwordVisibility)} // Alterna el estado
              >
                {passwordVisibility ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
          </FormControl>
        </div>
      );

    case FormFieldType.NUMBER:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <Input
              {...field}
              type={fieldType}
              placeholder={placeholder}
              valueasnumber="true"
              className={` ${inputCustomClasses}`}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          ​
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              placeholderText={"Selecciona la fecha de nacimiento"}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="AR"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.TEXTAREA:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className={`${inputCustomClasses}`}
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldType.SELECT:
      return (
        <div
          className={`flex items-center ${
            iconType ? "pl-2" : ""
          } overflow-hidden rounded-md ${fieldCustomClasses}`}>
          {iconType && (
            <Icon
              icon={iconType}
              iconLightColor={iconLightColor ? iconLightColor : "currentColor"}
              iconDarkColor={iconDarkColor ? iconDarkColor : "currentColor"}
            />
          )}
          <FormControl>
            <Select
              value={field.value || ""}
              onValueChange={(val) => {
                field.onChange(val);
                if (props.onChange) props.onChange(val);
              }}
              disabled={props.disabled}>
              <FormControl>
                <SelectTrigger className={`${inputCustomClasses}`}>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{props.children}</SelectContent>
            </Select>
          </FormControl>
        </div>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
          </div>
        </FormItem>
      );

    case FormFieldType.SLIDER:
      return (
        <FormItem className="flex flex-col space-y-4">
          <FormControl>
            <SliderInput
              value={field.value || 0}
              onChange={(newValue) => field.onChange(newValue)}
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
        </FormItem>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label, formItemCustomClasses, labelCustomClasses } =
    props;

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${formItemCustomClasses}`}>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel
              className={`${labelCustomClasses} text-color-light dark:text-color-dark`}>
              {label}
            </FormLabel>
          )}

          <RenderField
            field={field}
            props={props}
            passwordVisibility={passwordVisibility}
            setPasswordVisibility={setPasswordVisibility}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
