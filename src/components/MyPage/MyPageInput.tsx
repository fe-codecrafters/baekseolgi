"use client";
import EditIcon from "@/icons/EditIcon";
import { User } from "@prisma/client";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

interface Props {
  name: string;
  label: string;
  id?: string;
  type?: string;
  value?: string;
  userId: number;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
  editNickname?: (data: User) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function MyPageInput({
  name = "",
  label = "",
  id = "",
  type = "text",
  required = false,
  value = "",
  userId,
  placeholder = "",
  disabled = false,
  editNickname,
  onChange,
}: Props) {
  const [canEdit, setEdit] = useState(false);
  const [nickname, setNickname] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
    onChange ? onChange(e) : undefined;
  };

  // editNickname 아니고 editNickname
  const handleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    if (canEdit && editNickname) {
      editNickname({ id: userId, username: nickname });
    }
    setEdit(!canEdit);
  };

  const defaultCN =
    "inline-flex justify-center items-center gap-[16px] text-[16px] md:text-[24px] appearance-none bg-transparent";
  const editCN = defaultCN + " text-primary-gray";
  const readOnlyCN = defaultCN + " text-primary-black";

  return (
    <>
      <div>
        <label
          className="text-[14px] text-primary-darkGray md:text-[20px]"
          htmlFor={label}
        >
          {label}
        </label>
        <div className="mb-[1.25rem] flex align-middle">
          <input
            className={canEdit ? editCN : readOnlyCN}
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            value={nickname}
            placeholder={canEdit ? placeholder : "닉네임을 수정하세요."}
            required={required}
            disabled={disabled}
            readOnly={!canEdit}
          />
          <button onClick={handleEdit}>
            <EditIcon></EditIcon>
          </button>
        </div>
      </div>
    </>
  );
}
