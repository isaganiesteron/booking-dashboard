import { NextRequest, NextResponse } from "next/server"
import db from "../../utils/db"

export async function POST(request: NextRequest) {
	try {
		const { table } = await request.json()
		const rowCount = await db(`SELECT COUNT(*) FROM ${table};`)
		console.log(rowCount)
		return NextResponse.json({ ...rowCount, success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
