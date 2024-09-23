import bookingApi from "./bookingApi"
import chunkArray from "./chunkArray"
import transformBooking from "./transformBooking"
import db from "./db"

type BookingOrder = {
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

const saveBookingOrders = async (updated: { from: string; to: string }) => {
	// console.log("****saveBookingOrders")
	//  * 1. Get the list of orders. orders/details (this is in the current router)
	const orders = await bookingApi("orders/details", {
		updated: updated,
		currency: "USD",
	})
	console.log("  List of orders fetched.", orders.length)

	//  * 2. Get the Accommodation details for each order. orders/details/accommodations (using the reservation number)
	const orderIds = orders.map((order) => order.id)
	const orderChunks = chunkArray(orderIds)

	console.log("saveBookingOrders: orders:", orderIds.length, "chunks:", orderChunks.length)

	let allOrderAccommodations = []
	let chunkCount = 0
	while (chunkCount < orderChunks.length) {
		// console.log("  chunkCount: " + (chunkCount + 1))
		const accommodations = await bookingApi("orders/details/accommodations", {
			orders: orderChunks[chunkCount],
			extras: ["accommodation_details", "policies", "extra_charges"],
		})
		allOrderAccommodations.push(...accommodations)
		chunkCount++
	}

	const ordersWithAccommodations = orders.map((order) => {
		const accommodations = allOrderAccommodations.filter((acc) => acc.id === order.id)
		return { ...order, accommodations: accommodations[0] || {} }
	})

	console.log("  Orders updated with Accommodation details.", ordersWithAccommodations.length)

	//  * 3. Transform the data to be ready to be insert into the database
	const transformedOrders: BookingOrder[] = transformBooking(ordersWithAccommodations)
	const allValues: string[] = transformedOrders.map((value: BookingOrder) => {
		return `('${value.booking_date}','${value.booking_number}','${value.check_in_date}','${value.check_out_date}',${value.length_of_stay},${value.booking_window},'${value.status}',${value.your_commission},'${value.property_name}','${value.country}','${value.city}','${value.affiliate_id}','${value.label}','${value.booker_country}',${value.stay_probability})`
	})
	const insertQuery = `INSERT INTO bookings (booking_date,booking_number,check_in_date,check_out_date,length_of_stay,booking_window,status,your_commission,property_name,country,city,affiliate_id,label,booker_country,stay_probability) VALUES ${allValues.join(
		","
	)} ON CONFLICT (booking_number) DO NOTHING;`
	try {
		// console.log("----insertQuery START----")
		// console.log(insertQuery)
		// console.log("----insertQuery END----")
		const insert = await db(insertQuery)
		console.log("  Orders inserted into the database.", insert?.rowCount)

		return { message: "successfully insert rows", rowsCount: insert?.rowCount, dataCount: transformedOrders.length }
		// return { message: "successfully insert rows", rowsCount: insert?.rowCount, data: transformedOrders }
	} catch (error: any) {
		console.log("  Error inserting orders into the database.", error)
		return { message: error.message, rowsCount: 0, dataCount: transformedOrders.length }
		// return { message: error.message, rowsCount: 0, data: transformedOrders }
	}
}

export default saveBookingOrders
