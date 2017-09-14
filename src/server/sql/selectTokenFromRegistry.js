import Promise from 'bluebird'

/**
 * [selectFromRegistry description]
 * @param  {[type]} organization [description]
 * @return [type]                [description]
 */
export default function selectTokenFromRegistry({ organization }) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      SELECT token_address
      FROM registry
      WHERE organization = "${organization}"
    `, (error, result) => {
      if (error) { reject(error) }
      if (!result[0]) {
        let error = new Error(`
          Warning! No Contracts Found.

          Please Deploy a new GitToken Contract.
        `)
        reject(error)
      } else {
        resolve(result[0].token_address)
      }
    })
  })
}
