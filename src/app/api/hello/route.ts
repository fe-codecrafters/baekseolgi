import { NextResponse } from 'next/server'

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: hello world
 */
export async function GET() {
  return NextResponse.json({ data: "Health Check" })
}