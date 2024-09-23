import { NextRequest, NextResponse } from "next/server"
import db from "../../utils/db"

type Order = {
	order_id: string
	accommodation: number
	accommodation_details_location_address: string
	accommodation_details_location_city: number
	accommodation_details_location_coordinates_latitude: number
	accommodation_details_location_coordinates_longitude: number
	accommodation_details_location_country: string
	accommodation_details_location_post_code: string
	accommodation_details_name: string
	cancellation_details: string | null
	checkin: string // Format: YYYY-MM-DD
	checkout: string // Format: YYYY-MM-DD
	currency_accommodation: string
	currency_booker: string
	label: string
	price_commissionable_accommodation_currency: number
	price_commissionable_booker_currency: number
	price_total_accommodation_currency: number
	price_total_booker_currency: number
	products: Product[]
	reservation: number
	status: string
}

type Product = {
	allocation: {
		adults: number
		children: number
	}
	policies: {
		cancellation: CancellationPolicy[]
		meal_plan: {
			plan: string
		}
		smoking_preference: string
	}
	price: {
		base: Currency
		extra_charges: {
			non_conditional: Charge[]
		}
		total: Currency
	}
	room: number
	room_details: {
		name: string
	}
	status: string
}

type CancellationPolicy = {
	from: string // ISO format
	price: Currency
}

type Currency = {
	accommodation_currency: number
	booker_currency: number
}

type Charge = {
	charge: number
	mode: string
	percentage: number
	total_amount: Currency
}

export async function POST(request: NextRequest) {
	try {
		const allBookings: Order[] = await request.json()
		const allValues: string[] = allBookings.map((value: Order) => {
			return `('${value.order_id}',${value.accommodation},'${value.accommodation_details_location_address}',${value.accommodation_details_location_city},${value.accommodation_details_location_coordinates_latitude},${value.accommodation_details_location_coordinates_longitude},'${
				value.accommodation_details_location_country
			}','${value.accommodation_details_location_post_code}','${value.accommodation_details_name}','${value.cancellation_details}','${value.checkin}','${value.checkout}','${value.currency_accommodation}','${value.currency_booker}','${value.label}',${
				value.price_commissionable_accommodation_currency
			},${value.price_commissionable_booker_currency},${value.price_total_accommodation_currency},${value.price_total_booker_currency},'${JSON.stringify(value.products)}',${value.reservation},'${value.status}')`
		})
		const insertQuery = `INSERT INTO "orders" ("order_id", "accommodation", "accommodation_details_location_address", "accommodation_details_location_city", "accommodation_details_location_coordinates_latitude", "accommodation_details_location_coordinates_longitude", "accommodation_details_location_country", "accommodation_details_location_post_code", "accommodation_details_name", "cancellation_details", "checkin", "checkout", "currency_accommodation", "currency_booker", "label", "price_commissionable_accommodation_currency", "price_commissionable_booker_currency", "price_total_accommodation_currency", "price_total_booker_currency", "products", "reservation", "status") VALUES ${allValues.join(
			","
		)};`
		const insert = await db(insertQuery)
		return NextResponse.json({ ...insert?.rows, success: true })
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
