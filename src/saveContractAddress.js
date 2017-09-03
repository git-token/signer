import Promise from 'bluebird'

export default function saveContractAddress({
  address,
  organization,
  name,
  symbol,
  decimals,
  date
}) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      INSERT INTO gittoken_contracts (
        address,
        organization,
        name,
        symbol,
        decimals,
        date_deployed
      ) VALUES (
        "${address}",
        "${organization}",
        "${name}",
        "${symbol}",
        ${decimals},
        ${date}
      )
    `, (error, result) => {
      if (error) { reject(error) }
      resolve(result)
    })
  })
}
