"use client";
import EditIcon from "@/icons/EditIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import { AttendanceInputType } from "@/types";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import SeolgiIconL from "@/icons/AttendanceInput/SeolgiIconL";
import SeolgiIconS from "@/icons/AttendanceInput/SeolgiIconS";
import { Seolgi } from "@prisma/client";

interface Props {
  type?: AttendanceInputType;
  name: string;
  label: string;
  id: string;
  attendanceId: number;
  value?: string;
  defaultValue?: string;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
  seolgi: Seolgi;
  editAttendance?: (id: number, title: string) => void;
  deleteAttendance?: (id: number) => void;
  onChange?: (...args: any[]) => void;
  date: Date;
}

/**
 * 일일 출석 기록을 위한 Input 컴포넌트
 * @param {IconType} type 'calendar' | 'main'
 *
 * edit 버튼 클릭 -> update
 * HTMLFormElement -> update (Enter)
 * delete 버튼 클릭 -> delete
 */
export default function AttendanceInput({
  type = "main",
  name,
  id,
  attendanceId,
  defaultValue = "",
  placeholder = "",
  required = false,
  disabled = false,
  seolgi,
  editAttendance,
  deleteAttendance,
  onChange,
  date = new Date(),
}: Props) {
  const [canEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(defaultValue);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    editAttendance ? editAttendance(attendanceId, title) : undefined;
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
    onChange ? onChange() : undefined;
  };

  const handleEdit: MouseEventHandler = (e) => {
    e.preventDefault();
    if (canEdit && editAttendance) {
      editAttendance(attendanceId, title);
    }
    setEdit(!canEdit);
  };

  const handleDelete: MouseEventHandler = (e) => {
    e.preventDefault();
    deleteAttendance ? deleteAttendance(attendanceId) : undefined;
  };

  const isMain = type === "main";
  const defaultWrapperCN = `relative border-0 max-w-[340px] md:max-w-[600px] w-full mx-auto`;
  const mainWrapperCN =
    defaultWrapperCN + " h-[150px] md:h-[300px] text-base md:text-2xl";
  const calendarWrapperCN =
    defaultWrapperCN + " h-[100px] md:h-[150px] text-sm md:text-base";

  // left padding: 160px + 40px => pl-[200px]
  const defaultCN =
    "block w-full pl-[102px] md:pl-[200px] pt-4 h-full border-[1px] rounded-[20px] border-primary-gray appearance-none bg-transparent";
  const normalCN = defaultCN + " text-primary-gray";
  const readOnlyCN = defaultCN + " text-primary-black";

  const bgFill = seolgi.bgFill ? seolgi.bgFill : undefined;
  const blushFill = seolgi.blushFill ? seolgi.blushFill : undefined;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={isMain ? mainWrapperCN : calendarWrapperCN}
      >
        {/* 출석 입력 및 수정 */}
        <button
          className="group absolute right-0 top-0 z-20 mr-12 pt-4 md:mr-[68px]"
          onClick={handleEdit}
        >
          <EditIcon></EditIcon>
        </button>
        <button
          className="group absolute right-0 top-0 z-20 mr-3 pt-4 md:mr-6"
          onClick={handleDelete}
        >
          <DeleteIcon></DeleteIcon>
        </button>
        {/* 날짜, Date, 설기 로고 */}
        <div className="absolute z-10 flex h-full w-[90px] flex-col items-center justify-center gap-1 md:w-40">
          <span className="text-center text-base md:text-2xl">
            {format(date, "eee", { locale: ko })}
          </span>
          <label className="text-center text-sm md:text-base">
            {format(date, "d", { locale: ko })}
          </label>
          {isMain ? (
            <SeolgiIconL bgFill={bgFill} blushFill={blushFill}></SeolgiIconL>
          ) : (
            <SeolgiIconS bgFill={bgFill} blushFill={blushFill}></SeolgiIconS>
          )}
        </div>
        {/* TODO: 보더의 양 끝에 살짝 공백을 주기 애매, margin 노가다 하면 가능은 할 듯 .. 일단은 그냥 마진은 두지 않는거로  */}
        <div className="absolute h-[100%] w-[90px] border-r-[1px] border-primary-gray md:w-40"></div>
        <input
          className={canEdit ? normalCN : readOnlyCN}
          type={"text"}
          name={name}
          id={id}
          onChange={handleChange}
          value={title}
          placeholder={
            canEdit ? placeholder : "변경 아이콘을 누르고 목표를 수정하세요"
          }
          required={required}
          disabled={disabled}
          readOnly={!canEdit}
        />
      </form>
    </>
  );
}
