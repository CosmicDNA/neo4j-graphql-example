import neo4j from "neo4j-driver"

const {
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD
} = process.env

const connectAndRun = async (callBack) => {
  try {
    const driver = neo4j.driver(
      // "neo4j://localhost:7687",
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
    )

    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)

    await callBack(driver)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
}

export default connectAndRun
