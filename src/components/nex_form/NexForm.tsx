/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

interface NexFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  schema?: ZodType<any, any, any>;
  defaultValues?: DefaultValues<T>;
}

const NexForm = <T extends FieldValues>({
  onSubmit,
  children,
  schema,
  defaultValues,
}: NexFormProps<T>) => {
  const methods = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        {children}
      </form>
    </FormProvider>
  );
};

export default NexForm;
