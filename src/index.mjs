import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Neo4jGraphQL } from "@neo4j/graphql"
import connectAndRun from './libs/neo4j.mjs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf-8')

/**
 * @param {import('neo4j-driver').Driver} driver
 */
const callback = async (driver) => {
  const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

  const server = new ApolloServer({
    schema: await neoSchema.getSchema()
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}

await connectAndRun(callback)