import Promise from 'bluebird'

export default function saveTxReceipt({
  blockNumber,
  blockHash,
  contractAddress,
  cumulativeGasUsed,
  gasUsed,
  transactionHash
}) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      INSERT INTO transaction_receipts (
        contract_address,
        transaction_hash,
        cumulative_gas_used,
        block_hash,
        block_number,
        gas_used
      ) VALUES (
        "${contractAddress}",
        "${transactionHash}",
        ${cumulativeGasUsed},
        "${blockHash}",
        ${blockNumber},
        ${gasUsed}
      )
    `, (error, result) => {
      if (error) { reject(error) }
      resolve(result)
    })
  })
}
