-- AddForeignKey
ALTER TABLE "DailyAttendance" ADD CONSTRAINT "DailyAttendance_seolgiId_fkey" FOREIGN KEY ("seolgiId") REFERENCES "Seolgi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
