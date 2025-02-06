import React from "react"
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"

import { cn } from "@/registry/default/lib/utils"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"

interface Props<T extends FieldValues> extends React.ComponentProps<"input"> {
  errors: FieldErrors<T>
  control: Control<T>
  name: Path<T>
  label?: string
  labelClassName?: string
  /** This is a description for the input */
  description?: string
  descriptionClassName?: string

  errorMessageClassName?: string
  /** If true, replaces the description with the error message whenever error exists */
  errorReplacesDescription?: boolean
  /** Whether hide the red Asterisk for required inputs or not  */
  hideRequiredAsterisk?: boolean
}

export default function RHFInput<T extends FieldValues>({
  control,
  name,
  errors,
  label,
  labelClassName,
  description,
  descriptionClassName,
  errorMessageClassName,
  errorReplacesDescription = false,
  hideRequiredAsterisk = false,
  ...rest
}: Props<T>) {
  const error = errors?.[name]
  const errorMessage = error ? String(error?.message) : null

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-1.5">
          {label && (
            <Label
              htmlFor={`${rest.id ?? name}-form-item`}
              className={cn(error && "text-destructive", labelClassName)}
            >
              {label}{" "}
              {rest.required && !hideRequiredAsterisk && (
                <span className="text-destructive">*</span>
              )}
            </Label>
          )}
          <Input {...field} {...rest} id={`${rest.id ?? name}-form-item`} />

          {/* Don't show the description when there is an error and `errorReplacesDescription` is true */}
          {(errorMessage && !errorReplacesDescription && description) ||
          (description && !errorMessage) ? (
            <p
              id={`${rest.id ?? name}-form-item-description`}
              className={cn(
                "text-[0.8rem] text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : null}

          {errorMessage && (
            <p
              id={`${rest.id ?? name}-form-item-message`}
              className={cn(
                "text-[0.8rem] font-medium text-destructive",
                errorMessageClassName
              )}
            >
              {errorMessage}
            </p>
          )}
        </div>
      )}
    />
  )
}
