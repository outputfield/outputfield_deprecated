import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'

type Props = {
  name: string;
  value: boolean;
  label: string;
  onChange: (name: string, checked: boolean) => void;
  defaultChecked?: boolean;
};

const Checkbox: React.FC<Props> = ({
  value, name, label, onChange, defaultChecked = false
}) => {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.checked)
    setChecked(!checked)
  }

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <div className="p-3 max-w-max mr-4 mb-2 relative" key={name}>
      <input
        type="checkbox"
        id={name}
        name={name}
        className="opacity-0 absolute peer"
        onChange={handleChange}
        checked={checked}
      />
      <label
        htmlFor={name}
        className="flex items-center relative pt-1 text-xl uppercase peer-checked:text-blue peer-checked:glow-blue cursor-pointer">
        <div className="relative flex justify-center z-0 mr-2 w-8 h-8">
          <div className="absolute -z-10 bg-white border border-blue w-4 h-4 self-end focus:border-black bottom-1 left-1.5" />
          {checked && (
            <Image src="/checkIcon.svg" alt="checked icon" width="22" height="27" className="absolute" />
          )}
        </div>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
