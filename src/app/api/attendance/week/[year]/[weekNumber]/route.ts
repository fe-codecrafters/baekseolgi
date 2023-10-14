import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /attendance/week/{year}/{weekNumber}:
 *   get:
 *     summary: Get attendance for a specific week
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *          type: integer
 *       - name: weekNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { year: string; weekNumber: string } },
) {
  console.log(params.year, params.weekNumber);
  // TODO
  return NextResponse.json("TODO");
}
