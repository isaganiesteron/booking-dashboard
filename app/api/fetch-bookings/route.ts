import { NextRequest, NextResponse } from "next/server"
import db from "../../utils/db"

export async function POST(request: NextRequest) {
	try {
		const { startRow, limit, order } = await request.json()
		const query = `SELECT booking_date, booking_number, status, property_name, country FROM bookings ORDER BY ${order} LIMIT ${limit} OFFSET ${startRow};`
		const select = await db(query)
		console.log(select?.rows.length)
		return NextResponse.json({ rows: select?.rows, success: true })
	} catch (error) {
		console.log("error")
		console.log(error)
		return NextResponse.error()
	}
}
