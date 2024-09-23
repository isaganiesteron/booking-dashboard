import { NextRequest, NextResponse } from "next/server"
import saveBookingOrders from "@/app/utils/saveBookingOrders"

export async function POST(request: NextRequest) {
	try {
		const { range } = await request.json()
		const rangeToSave = JSON.parse(range)
		const result = await saveBookingOrders(rangeToSave)
		return NextResponse.json({ ...result, success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
