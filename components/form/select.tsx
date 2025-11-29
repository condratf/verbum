import React, { FC } from 'react'

interface FormSelectProps {
  label: string;
  name: string;
  options: string[];
}

export const FormSelect: FC<FormSelectProps> = ({ label, name, options }) => {
  return (
    <div className='flex flex-col gap-1 mt-1'>
      <label htmlFor={name} className='text-xs'>{label}</label>
      <select name={name} className='border border-gray-300 rounded px-2 py-1 cursor-pointer'>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
