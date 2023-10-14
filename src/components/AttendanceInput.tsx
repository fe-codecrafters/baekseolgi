"use client";
import AttendanceEditIcon from "@/icons/AttendanceEditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import SeolgiIcon from "@/icons/SeolgiIcon";
import { AttendanceInputType } from "@/types";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { useState } from "react";

interface Props {
  type?: AttendanceInputType;
  name: string;
  label: string;
  id: string;
  value?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  date: Date;
  height?: number;
}

/**
 * 일일 출석 기록을 위한 Input 컴포넌트
 * @param {IconType} type 'calendar' | 'main'
 *
 */
export default function AttendanceInput({
  name,
  id,
  type = "main",
  required = false,
  defaultValue = "",
  placeholder = "",
  disabled = false,
  onChange,
  date = new Date(),
}: Props) {
  const [canEdit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(!canEdit);
  };

  const handleDelete = () => {
    // TODO
  };

  const isMain = type === "main";
  const defaultWrapperCN = `relative border-0 text-2xl max-w-[665px] w-full mx-auto`;
  const mainWrapperCN = defaultWrapperCN + " h-[300px]";
  const calendarWrapperCN = defaultWrapperCN + " h-[150px]";

  // left padding: 160px + 40px => pl-[200px]
  const defaultCN =
    "block w-full pl-[200px] pt-4 h-full border-[1px] rounded-lg border-TPrimary appearance-none bg-transparent";
  const normalCN = defaultCN + " text-primary-black";
  const readOnlyCN = defaultCN + " text-primary-gray";

  return (
    <>
      <div className={isMain ? mainWrapperCN : calendarWrapperCN}>
        {/* 출석 입력 및 수정 */}
        <button
          className="group absolute right-0 top-0 z-20 mr-14 pt-4"
          onClick={handleEdit}
        >
          <AttendanceEditIcon></AttendanceEditIcon>
        </button>
        <button
          className="group absolute right-0 top-0 z-20 mr-6 pt-4"
          onClick={handleDelete}
        >
          <DeleteIcon></DeleteIcon>
        </button>
        {/* 날짜, Date, 설기 로고 */}
        <div className="absolute z-10 flex h-full w-40 flex-col items-center justify-center gap-1">
          <span className="text-center text-[24px]">
            {format(date, "eee", { locale: ko })}
          </span>
          <label className="text-center text-base">
            {format(date, "d", { locale: ko })}
          </label>
          <SeolgiIcon
            type="desktop"
            width={isMain ? 70 : 40}
            height={isMain ? 70 : 40}
          ></SeolgiIcon>
        </div>
        {/* TODO: 보더의 양 끝에 살짝 공백을 주기 애매, margin 노가다 하면 가능은 할 듯 .. 일단은 그냥 마진은 두지 않는거로  */}
        <div className="absolute h-[100%] w-40 border-r-[1px] border-primary-gray"></div>
        <input
          className={canEdit ? normalCN : readOnlyCN}
          type={"text"}
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
