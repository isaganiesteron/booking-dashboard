import pg from "pg"

const db = async (query: string) => {
	const { Client } = pg
	const client = new Client()
	await client.connect()
	const res = await client.query(query)
	await client.end()
	return res
}

export default db
