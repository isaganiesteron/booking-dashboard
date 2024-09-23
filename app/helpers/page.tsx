"use client"

import { useState } from "react"

const Home = () => {
	// const [objectToInsert, setObjectToInsert] = useState("[]")
	const [rangeToSave, setRangeToSave] = useState(
		JSON.stringify({
			from: "2023-10-01T00:00:00+00:00",
			to: "2023-10-02T00:00:00+00:00",
		})
	)
	const [bookingResults, setBookingResults] = useState("")

	const bookingHandler = async () => {
		const request = await fetch("/api/fetch-bookings", {
			method: "POST",
		})
		if (request?.status !== 200) {
			console.log("Error")
		}
		const bookings = await request.json()
		console.log(bookings)
	}

	const ordersHandler = async () => {
		const request = await fetch("/api/fetch-orders", {
			method: "POST",
		})
		if (request?.status !== 200) {
			console.log("Error")
		}
		const orders = await request.json()
		console.log(orders)
	}

	// const insertBookingsHandler = async () => {
	// 	try {
	// 		JSON.parse(objectToInsert)
	// 		const request = await fetch("/api/insert-booking", {
	// 			method: "POST",
	// 			body: objectToInsert,
	// 		})
	// 		if (request?.status !== 200) {
	// 			console.log("Error")
	// 		}
	// 		const bookings = await request.json()
	// 		console.log(bookings)
	// 	} catch (error) {
	// 		alert("Invalid JSON")
	// 		return
	// 	}
	// }

	// const insertOrdersHandler = async () => {
	// 	try {
	// 		JSON.parse(objectToInsert)
	// 		const request = await fetch("/api/insert-orders", {
	// 			method: "POST",
	// 			body: objectToInsert,
	// 		})
	// 		if (request?.status !== 200) {
	// 			console.log("Error")
	// 		}
	// 		const orders = await request.json()
	// 		console.log(orders)
	// 	} catch (error) {
	// 		alert("Invalid JSON")
	// 		return
	// 	}
	// }

	const bookingOrdersHandler = async () => {
		setBookingResults("")
		const request = await fetch("/api/historical-bookings", {
			method: "POST",
			body: JSON.stringify({ range: rangeToSave }),
		})
		if (request?.status === 200) {
			const orders = await request.json()
			setBookingResults(JSON.stringify(orders, null, 2))
			console.log(orders)
		} else {
			console.log(request)
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-10 gap-2">
			<button onClick={bookingHandler} className="w-full border p-2 rounded-md bg-red-900">
				Bookings
			</button>
			<button onClick={ordersHandler} className="w-full border p-2 rounded-md bg-yellow-600">
				Orders
			</button>

			<button onClick={bookingOrdersHandler} className="w-full border p-2 rounded-md bg-blue-500">
				Booking API: Historical Bookings
			</button>

			<div className="flex w-full h-80 flex-col gap-2">
				<textarea
					value={rangeToSave}
					onChange={(value) => {
						setRangeToSave(value.target.value)
					}}
					className="w-full h-1/2 p-2 border rounded-md text-black"
					placeholder="Enter your query here"
				></textarea>
				{/* <button onClick={insertBookingsHandler} className="p-2 rounded-md bg-green-900">
					Insert Bookings
				</button>
				<button onClick={insertOrdersHandler} className="p-2 rounded-md bg-orange-600">
					Insert Orders
				</button> */}
			</div>

			<h1>Results</h1>
			<textarea value={bookingResults} disabled={true} className="w-full h-96 p-2 border rounded-md text-black" placeholder="Enter your query here"></textarea>
		</main>
	)
}
export default Home
