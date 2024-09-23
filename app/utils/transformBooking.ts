type BookingOrder = {
	booking_date: string // Format: YYYY-MM-DD
	booking_number: string
	check_in_date: string // Format: YYYY-MM-DD
	check_out_date: string // Format: YYYY-MM-DD
	length_of_stay: number
	booking_window: number
	status: string
	your_commission: number
	price_commissionable: number
	price_total: number
	property_name: string
	country: string
	city: string
	affiliate_id: string
	label: string
	booker_country: string
	stay_probability: number
}

type Coordinates = {
	latitude: number
	longitude: number
}

type Location = {
	address: string
	city: number
	coordinates: Coordinates
	country: string
	post_code: string
}

type AccommodationDetails = {
	location: Location
	name: string
}

type Currency = {
	accommodation: string
	booker: string
}

type PriceDetails = {
	accommodation_currency: number
	booker_currency: number
}

type CancellationPolicy = {
	from: string
	price: PriceDetails
}

type MealPlan = {
	meals: any[] // You can specify a more precise type if available
	plan: string
}

type Policies = {
	cancellation: CancellationPolicy[]
	meal_plan: MealPlan
	smoking_preference: string
}

type ExtraCharge = {
	charge: number
	mode: string
	percentage: number | null
	total_amount: PriceDetails
	unit_amount: PriceDetails
}

type ExtraCharges = {
	conditional: any[] // You can specify a more precise type if available
	non_conditional: ExtraCharge[]
}

type ProductPrice = {
	base: PriceDetails
	extra_charges: ExtraCharges
	total: PriceDetails
}

type Allocation = {
	adults: number | null
	children: number | null
	guests: number
}

type RoomDetails = {
	name: string
}

type Product = {
	allocation: Allocation
	policies: Policies
	price: ProductPrice
	room: number
	room_details: RoomDetails
	status: string
}

type Price = {
	commissionable: PriceDetails
	total: PriceDetails
}

type AccommodationObject = {
	id: string
	accommodation: number
	accommodation_details: AccommodationDetails
	cancellation_details: null
	checkin: string
	checkout: string
	currency: Currency
	label: string
	price: Price
	products: Product[]
	reservation: number
	status: string
}

type OrdersWithAccommodations = {
	id: string
	accommodations: AccommodationObject
	affiliate: number
	booker: {
		address: {
			city: string | null
			country: string
		}
		language: string
		platform: string
		travel_purpose: string
	}
	created: string // Format: YYYY-MM-DDTHH:mm:ss+00:00
	currency: string
	price: {
		commissionable: number
		total: number
	}
	status: string
	updated: string // Format: YYYY-MM-DDTHH:mm:ss+00:00
}
// Function to calculate the number of days between two dates
const calculateDaysBetween = (startDate: string, endDate: string): number => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

const escapeSingleQuotes = (input: string): string => {
	return input.replace(/'/g, "''")
}

const transformBooking = (orders: OrdersWithAccommodations[]): BookingOrder[] => {
	return orders.map((order: OrdersWithAccommodations) => {
		const bookingDate = new Date(order.created).toISOString().split("T")[0]
		const checkInDate = order.accommodations.checkin
		const checkOutDate = order.accommodations.checkout

		const lengthOfStay = calculateDaysBetween(checkInDate, checkOutDate)
		const bookingWindow = calculateDaysBetween(bookingDate, checkInDate)
		return {
			booking_date: bookingDate,
			booking_number: order.id,
			check_in_date: checkInDate,
			check_out_date: checkOutDate,
			length_of_stay: lengthOfStay,
			booking_window: bookingWindow,
			status: order.status,
			your_commission: 0, // *****Assuming a fixed value for now, can be adjusted based on logic
			price_commissionable: order.price?.commissionable || 0, // Default to 0 if null
			price_total: order.price?.total || 0, // Default to 0 if null
			property_name: escapeSingleQuotes(order.accommodations.accommodation_details.name), // *****Assumed field (can be adjusted based on available data)
			country: order.accommodations.accommodation_details.location.country,
			city: `ID:${order.accommodations.accommodation_details.location.city}`, // Not city name but a city ID
			affiliate_id: order.affiliate.toString(),
			label: order.accommodations.label,
			booker_country: order.booker.address.country,
			stay_probability: 0, // *****Assuming a fixed value for now, can be adjusted based on logic
		}
	})
}

export default transformBooking
