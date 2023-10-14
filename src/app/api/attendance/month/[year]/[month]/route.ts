import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /attendance/month/{year}/{month}:
 *   get:
 *     summary: Get attendance for a specific month
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: month
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
  { params }: { params: { year: string; month: string } },
) {
  console.log(params);
  console.log(params.year, params.month);
  // TODO
  return NextResponse.json("TODO");
}
