'use client'
import DeleteIcon from "@/icons/DeleteIcon";
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

export default function AttendanceInput({
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

  const defaultCN = "block w-full pl-4 pt-4 h-full border-[1px] rounded-lg border-TPrimary appearance-none bg-transparent"
  const normalCN = defaultCN + ' text-primary-black'
  const readOnlyCN = defaultCN + ' text-primary-gray'

  return <>
    <div className="relative h-32 border-0 text-2xl max-w-[665px] w-full mx-auto">
      {/* 날짜, Date, 설기 로고 */}
      <label
        className="absolute z-10 top-2 inset-x-0 text-center"
        htmlFor={label}
      >
        {label}
      </label>
      {/* 출석 입력 및 수정 */}
      <div className="absolute z-20 top-0 right-0 pt-4 pr-6" onClick={() => {}}>
        <DeleteIcon></DeleteIcon>
      </div>
      <div className="absolute z-20 top-0 right-0 pt-4 pr-10" onClick={handleEdit}>
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