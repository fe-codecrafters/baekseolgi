"use client";
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
  name = "",
  label = "",
  id = "",
  type = "text",
  required = false,
  defaultValue = "",
  placeholder = "",
  disabled = false,
  onChange,
}: Props) {
  const [canEdit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(!canEdit);
  };

  const defaultCN =
    "block w-full pl-4 pt-4 h-full border-[1px] rounded-lg border-TPrimary appearance-none bg-transparent";
  const normalCN = defaultCN + " text-primary-black";
  const readOnlyCN = defaultCN + " text-primary-gray";

  return (
    <>
      <div className="relative mx-auto h-32 w-full max-w-[665px] border-0 text-2xl">
        <label
          className="absolute inset-x-0 top-2 z-10 text-center"
          htmlFor={label}
        >
          {label}
        </label>
        <button
          className="absolute right-0 top-0 z-20 mr-6 pt-4"
          onClick={handleEdit}
        >
          <EditIcon></EditIcon>
        </button>
        <input
          className={canEdit ? normalCN : readOnlyCN}
          type={type}
          name={name}
          id={id}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={
            canEdit ? placeholder : "변경 아이콘을 누르고 목표를 수정하세요"
          }
          required={required}
          disabled={disabled}
          readOnly={!canEdit}
        />
      </div>
    </>
  );
}
