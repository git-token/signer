import Promise from 'bluebird'

export default function getContractAddress() {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      SELECT address from gittoken_contracts ORDER BY date_deployed DESC limit 1;
    `, (error, result) => {
      if (error) { reject(error) }
      if (!result[0]) {
        let error = new Error(`
          Warning! No Contracts Found.
          Please Deploy a new GitToken Contract.
        `)
        reject(error)
      } else {
        console.log('getContractAddress::result[0].address', result[0].address)
        resolve(result[0].address)
      }
    })
  })
}
