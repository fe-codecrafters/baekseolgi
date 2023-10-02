'use client'
import EditIcon from "@/icons/EditIcon";
import { useState } from "react";

interface Props {
  name: string;
  label: string;
  id?: string;
  type?: string;
  value?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function ObjectiveInput({
  name = '',
  label = '',
  id = '',
  type = 'text',
  required = false,
  defaultValue = '',
  placeholder = '',
  disabled = false,
  onChange
}: Props) {
  const [canEdit, setEdit] = useState(true)
  const handleEdit = () => {
    setEdit(!canEdit)
  }

  const normalCN = "block w-full pl-4 pt-4 h-full text-primary-black border-[1px] rounded-lg border-TPrimary appearance-none bg-transparent"
  const readOnlyCN = "block w-full pl-4 pt-4 h-full text-primary-gray border-[1px] rounded-lg border-TPrimary appearance-none bg-transparent"

  return <>
    <div className="relative h-32 border-0 text-2xl max-w-[665px] w-full mx-auto">
      <label
        className="absolute z-10 top-2 inset-x-0 text-center"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="absolute z-20 top-0 right-0 pt-4 pr-6" onClick={handleEdit}>
        <EditIcon></EditIcon>
      </div>
      <input
        className={canEdit ? normalCN : readOnlyCN}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={canEdit ? placeholder : '변경 아이콘을 누르고 목표를 수정하세요'}
        required={required}
        disabled={disabled}
        readOnly={!canEdit}
      />
    </div>
  </>
}