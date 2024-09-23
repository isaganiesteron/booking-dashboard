export const maxDuration = 60
import { NextRequest, NextResponse } from "next/server"
import splitDateRangeIntoWeeks from "@/app/utils/splitDateRangeIntoWeeks"
import saveBookingOrders from "@/app/utils/saveBookingOrders"

export async function POST(request: NextRequest) {
	try {
		const { range } = await request.json()
		console.log(typeof range, range)
		const dateRange = splitDateRangeIntoWeeks(JSON.parse(range))

		console.log("*******************")
		console.log("Start saving historical data for this date range:", JSON.parse(range).from, "to", JSON.parse(range).to)
		if (dateRange.length > 0) {
			for (const week of dateRange) {
				console.log("  Saving historical data for", week)
				try {
					// const result = "TEST"
					const result = await saveBookingOrders(week)
					console.log("    Result", result)
				} catch (error) {
					console.log("    Error", error)
				}
				console.log("")
				await new Promise((resolve) => setTimeout(resolve, 2000))
			}
		}
		console.log("*******************")

		return NextResponse.json({ success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
