const bookingApi = async (endpoint: string, parameters: object) => {
	let data: any[] = []
	let next_page: string | null = null

	while (next_page != "" || next_page === null) {
		const currentBody: object = next_page === "" || next_page === null ? parameters : { page: next_page }
		console.log("    fetching from endpoint", endpoint)
		const response = await fetch(`https://demandapi.booking.com/3.1/${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.BOOKING_API_KEY}`,
			},
			body: JSON.stringify(currentBody),
		})

		if (response.status === 200) {
			try {
				const res = await response.json()
				if (res.data) {
					data.push(...res.data)
				} else if (res.errors) {
					console.log("**ERROR1")
					console.log(res)
					next_page = ""
				}

				if (res.metadata?.next_page) next_page = res.metadata?.next_page
				else next_page = ""
			} catch (err) {
				console.log("**ERROR2")
				console.log(err)
				next_page = ""
			}
		} else {
			console.log(`***Status ${response.status}`)
			try {
				const res = await response.json()
				console.log(res)
			} catch (e) {
				if (response.status !== 429) console.log(response)
			}
			next_page = ""
		}

		console.log("    2 second pause...")
		await new Promise((resolve) => setTimeout(resolve, 2000))
	}

	return data
}

export default bookingApi
