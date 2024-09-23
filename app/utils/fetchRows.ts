import db from "./db"

const fetchRows = async (table: string) => {
	try {
		const select = await db(`SELECT COUNT(*) FROM ${table};`)
		return select?.rows
	} catch (error) {
		console.log(error)
	}
}

export default fetchRows
