"use client";
import AttendanceInput from "@/components/AttendanceInput";
import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useDeleteAttendance } from "@/features/attendance/api/deleteAttendance";
import { useMonthlyAttendances } from "@/features/attendance/api/getAttendances";
import { useUpdateAttendance } from "@/features/attendance/api/updateAttendance";
import { attendanceKeys } from "@/features/attendance/key";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <LoadingIndicator />;

  const userId = session?.user.id;

  const activeObjectiveId = session?.user.activeObjectiveId;
  if (!activeObjectiveId) return router.push("/tutorial");

  const { year, month } = useSelector((state: RootState) => state.date);

  const RQKey = attendanceKeys.month({
    year: year,
    month: month,
    userId: userId!,
    objectiveId: activeObjectiveId,
  });
  const { isLoading, data, isSuccess } = useMonthlyAttendances(RQKey);

  const updateAttendanceMutation = useUpdateAttendance(RQKey);
  const deleteAttendanceMutation = useDeleteAttendance(RQKey);

  const editAttendance = (attendanceId: number, title: string) => {
    updateAttendanceMutation.mutate({
      data: {
        title,
      },
      attendanceId,
    });
  };

  const deleteAttendance = (attendanceId: number) => {
    deleteAttendanceMutation.mutate({
      attendanceId,
    });
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <CalendarHeader />
          <div className="mt-[40px] flex h-[600px] items-center justify-center md:h-[800px]">
            <p className="text-xl md:text-2xl">이 달에는 기록이 없어요!</p>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) return <LoadingIndicator></LoadingIndicator>;

  //TODO: 렌더링 순서가 이상하게 들어오고 있음. 확인해야 함.
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <CalendarHeader />
        <div className="mt-[40px] w-[600px]">
          {isSuccess && data && data?.attendance?.length > 0 ? (
            data.attendance.map((el) => {
              return (
                <div className="mb-[24px]" key={el.id}>
                  {/* onchange 추가해서 데이터 변경하는 기능 추가 예정 */}
                  <AttendanceInput
                    label="출석"
                    id={`attendance-${el.id}`}
                    name={`attendance-${el.id}`}
                    attendanceId={el.id}
                    onChange={() => {}}
                    seolgi={el.Seolgi}
                    placeholder="Calendar 페이지 placeholder"
                    required
                    date={new Date(el.createdAt)}
                    defaultValue={el.title}
                    editAttendance={editAttendance}
                    deleteAttendance={deleteAttendance}
                    type="calendar"
                  ></AttendanceInput>
                </div>
              );
            })
          ) : (
            <div className="mt-[40px] flex h-[600px] items-center justify-center md:h-[800px]">
              <p className="text-xl md:text-2xl">이 달에는 기록이 없어요!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
