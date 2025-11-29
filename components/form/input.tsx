'use client'
import { FC } from 'react'

interface FormInputProps {
  label: string;
  name: string;
  type: string;
}

export const FormInput: FC<FormInputProps> = ({ label, name, type }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs">{label}</label>
      <input type={type} name={name} className="border border-gray-300 rounded px-2 py-1" />
    </div>
  )
}