'use client'

import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '~/components/molecules/button'
import { Input } from '~/components/molecules/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/organisms/form'
import { addPeriod } from '~/components/organisms/periodForm/serverAction'
import { numberToTimeString, timeStringToNumber } from '~/utils'

import { formSchema, FormSchemaType } from './schema'
import { ScheduleItemProps } from './types'

export const PeriodFormClient = ({ startLabel, endLabel }: ScheduleItemProps) => {
  const [pending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAt: 0,
      endAt: 0,
    },
  })

  const onSubmit = (values: FormSchemaType) => {
    startTransition(() => {
      addPeriod(values).then(refresh)
    })
  }

  return (
    <FormProvider {...form}>
      <form className="flex w-fit items-end gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="startAt"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>{startLabel}</FormLabel>
              <FormControl>
                <Input
                  onChange={e => {
                    onChange(timeStringToNumber(e.currentTarget.value))
                  }}
                  type="time"
                  value={numberToTimeString(value)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endAt"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>{endLabel}</FormLabel>
              <FormControl>
                <Input
                  onChange={e => {
                    onChange(timeStringToNumber(e.currentTarget.value))
                  }}
                  type="time"
                  value={numberToTimeString(value)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          +
        </Button>
      </form>
    </FormProvider>
  )
}
