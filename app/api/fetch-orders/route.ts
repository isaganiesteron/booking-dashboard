import { NextRequest, NextResponse } from "next/server"
import db from "../../utils/db"

export async function POST(request: NextRequest) {
	try {
		const select = await db("SELECT * FROM orders;")
		return NextResponse.json({ ...select?.rows, success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
