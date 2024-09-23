const splitDateRangeIntoWeeks = (dateRange: { from: string; to: string }): { from: string; to: string }[] => {
	const startDate = new Date(dateRange.from)
	const endDate = new Date(dateRange.to)

	const chunks: { from: string; to: string }[] = []

	let currentStartDate = new Date(startDate)

	while (currentStartDate < endDate) {
		const currentEndDate = new Date(currentStartDate)
		currentEndDate.setDate(currentEndDate.getDate() + 6) // Add 6 days to create a 7-day chunk

		// If the calculated end date goes beyond the specified end date, adjust it to the end date
		if (currentEndDate > endDate) {
			currentEndDate.setTime(endDate.getTime())
		}

		chunks.push({
			from: currentStartDate.toISOString(),
			to: currentEndDate.toISOString(),
		})

		// Move the start date to the next day after the current end date
		currentStartDate.setDate(currentStartDate.getDate() + 7)
	}

	return chunks
}

export default splitDateRangeIntoWeeks
