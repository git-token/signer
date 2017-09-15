import Promise from 'bluebird'


/**
 * [insertIntoTxReceipt description]
 * @param  {Number} [blockNumber=0]       [description]
 * @param  {String} [blockHash=""]        [description]
 * @param  {String} [contractAddress=""]  [description]
 * @param  {Number} [cumulativeGasUsed=0] [description]
 * @param  {Number} [gasUsed=0]           [description]
 * @param  {String} [transactionHash=""]  [description]
 * @param  {String} [organization=""}]    [description]
 * @return [type]                         [description]
 */
export default function insertIntoTxReceipt({
  blockNumber=0,
  blockHash="",
  contractAddress="",
  cumulativeGasUsed=0,
  gasUsed=0,
  transactionHash="",
  organization=""
}) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      INSERT INTO transaction_receipts (
        contract_address,
        transaction_hash,
        cumulative_gas_used,
        block_hash,
        block_number,
        gas_used,
        organization
      ) VALUES (
        "${contractAddress}",
        "${transactionHash}",
        ${cumulativeGasUsed},
        "${blockHash}",
        ${blockNumber},
        ${gasUsed},
        "${organization}"
      );
    `, (error, result) => {
      if (error) { reject(error) }
      resolve(result)
    })
  })
}
