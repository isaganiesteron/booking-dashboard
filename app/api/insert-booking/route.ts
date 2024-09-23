import { NextRequest, NextResponse } from "next/server"
import db from "../../utils/db"

interface Booking {
	booking_date: string // Format: YYYY-MM-DD
	booking_number: string
	check_in_date: string // Format: YYYY-MM-DD
	check_out_date: string // Format: YYYY-MM-DD
	length_of_stay: number
	booking_window: number
	status: string
	your_commission: number
	property_name: string
	country: string
	city: string
	affiliate_id: string
	label: string
	booker_country: string
	stay_probability: number
}

export async function POST(request: NextRequest) {
	try {
		const allBookings: Booking[] = await request.json()
		const allValues: string[] = allBookings.map((value: Booking) => {
			return `('${value.booking_date}','${value.booking_number}','${value.check_in_date}','${value.check_out_date}',${value.length_of_stay},${value.booking_window},'${value.status}',${value.your_commission},'${value.property_name}','${value.country}','${value.city}','${value.affiliate_id}','${value.label}','${value.booker_country}',${value.stay_probability})`
		})
		const insertQuery = `INSERT INTO bookings (booking_date,booking_number,check_in_date,check_out_date,length_of_stay,booking_window,status,your_commission,property_name,country,city,affiliate_id,label,booker_country,stay_probability) VALUES ${allValues.join(
			","
		)} ON CONFLICT (booking_number) DO NOTHING;`
		const insert = await db(insertQuery)
		return NextResponse.json({ count: insert?.rowCount, success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
