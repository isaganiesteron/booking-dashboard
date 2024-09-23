import { useState, useEffect } from "react"
import { PencilIcon } from "@heroicons/react/24/solid"
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, Avatar, IconButton, Tooltip, Input } from "@material-tailwind/react"

const TABLE_HEAD = ["Booking Date", "Booking ID", "Status", "Country", "Property Name"]

export function BookingsTable() {
	const [rowCount, setRowCount] = useState(0)
	const [rows, setRows] = useState([])

	const fetchRows = async (startRow, limit, order) => {
		console.log("****fetchRows")
		try {
			const response = await fetch("/api/fetch-bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ startRow, limit, order }),
			})
			const data = await response.json()
			// setRows((prevRows) => [...prevRows, ...data.rows])
			setRows(data.rows)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchRowCount = async () => {
		console.log("****fetchRowCount")
		const response = await fetch("/api/fetch-booking-count", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ table: "bookings" }),
		})
		const data = await response.json()
		setRowCount(data.rows[0]?.count)
	}

	useEffect(() => {
		fetchRowCount()
		fetchRows(0, 100, "booking_date desc")
	}, [])

	useEffect(() => {
		console.log("****rows", rows)
	}, [rows])

	return (
		<Card className="h-full w-full">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div>
						<Typography variant="h5" color="blue-gray">
							Recent Transactions
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							These are details about the last transactions
						</Typography>
					</div>
					<div className="flex w-full shrink-0 gap-2 md:w-max">
						<div className="w-full md:w-72">
							<Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
						</div>
						<Button className="flex items-center gap-3" size="sm">
							<ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.length > 0 &&
							rows.map(({ booking_date, booking_number, status, property_name, country }, index) => {
								const isLast = index === rows.length - 1
								const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

								return (
									<tr key={booking_number}>
										<td className={classes}>
											<Typography variant="small" color="blue-gray" className="font-bold">
												{booking_date.split("T")[0]}
											</Typography>
										</td>
										<td className={classes}>
											<Typography variant="small" color="blue-gray" className="font-normal">
												{booking_number}
											</Typography>
										</td>
										<td className={classes}>
											<Typography variant="small" color="blue-gray" className="font-normal">
												{status}
											</Typography>
										</td>
										<td className={classes}>
											<Typography variant="small" color="blue-gray" className="font-normal">
												{country}
											</Typography>
										</td>
										<td className={classes}>
											<Typography variant="small" color="blue-gray" className="font-normal">
												{property_name}
											</Typography>
										</td>
									</tr>
								)
							})}
						{/* {TABLE_ROWS.map(({ img, name, amount, date, status, account, accountNumber, expiry }, index) => {
							const isLast = index === TABLE_ROWS.length - 1
							const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

							return (
								<tr key={name}>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<Avatar src={img} alt={name} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
											<Typography variant="small" color="blue-gray" className="font-bold">
												{name}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<Typography variant="small" color="blue-gray" className="font-normal">
											{amount}
										</Typography>
									</td>
									<td className={classes}>
										<Typography variant="small" color="blue-gray" className="font-normal">
											{date}
										</Typography>
									</td>
									<td className={classes}>
										<div className="w-max">
											<Chip size="sm" variant="ghost" value={status} color={status === "paid" ? "green" : status === "pending" ? "amber" : "red"} />
										</div>
									</td>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
												<Avatar
													src={account === "visa" ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png" : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"}
													size="sm"
													alt={account}
													variant="square"
													className="h-full w-full object-contain p-1"
												/>
											</div>
											<div className="flex flex-col">
												<Typography variant="small" color="blue-gray" className="font-normal capitalize">
													{account.split("-").join(" ")} {accountNumber}
												</Typography>
												<Typography variant="small" color="blue-gray" className="font-normal opacity-70">
													{expiry}
												</Typography>
											</div>
										</div>
									</td>
									<td className={classes}>
										<Tooltip content="Edit User">
											<IconButton variant="text">
												<PencilIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
								</tr>
							)
						})} */}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Button variant="outlined" size="sm">
					Previous
				</Button>
				<div className="flex items-center gap-2">
					<IconButton variant="outlined" size="sm">
						1
					</IconButton>
					<IconButton variant="text" size="sm">
						2
					</IconButton>
					<IconButton variant="text" size="sm">
						3
					</IconButton>
					<IconButton variant="text" size="sm">
						...
					</IconButton>
					<IconButton variant="text" size="sm">
						8
					</IconButton>
					<IconButton variant="text" size="sm">
						9
					</IconButton>
					<IconButton variant="text" size="sm">
						10
					</IconButton>
				</div>
				<Button variant="outlined" size="sm">
					Next
				</Button>
			</CardFooter>
		</Card>
	)
}

export default BookingsTable
