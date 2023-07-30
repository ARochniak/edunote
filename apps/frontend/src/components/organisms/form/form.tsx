import * as React from 'react'
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'

import { FormFieldContext, FormItemContext } from '~/components/organisms/form/hooks'
import { cn } from '~/utils'

import { Label } from '../../molecules/label'

import { useFormField } from './hooks'

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = 'FormItem'

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return <Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
})
FormLabel.displayName = 'FormLabel'

export const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        id={formItemId}
        {...props}
      />
    )
  },
)
FormControl.displayName = 'FormControl'

export const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} id={formDescriptionId} {...props} />
  },
)
FormDescription.displayName = 'FormDescription'

export const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} id={formMessageId} {...props}>
        {body}
      </p>
    )
  },
)
FormMessage.displayName = 'FormMessage'
