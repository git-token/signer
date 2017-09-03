const net = require('net')
const { signerIpcPath, recoveryShare } = require('../config')
const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

const
  username     = 'Ryanmtate',
  rewardType   = "create",
  reservedType = "",
  rewardBonus  = 0,
  deliveryID   = "00000000-0000-0000-0000-000000000000"

const params = [
	username,
	rewardType,
	reservedType,
	rewardBonus,
	deliveryID
] 

  client.write(JSON.stringify({
    event: 'sign_contract_transaction',
    data: {
      recoveryShare,
      method: 'rewardContributor',
      params,
    }
  }))


client.on('data', (data) => {
  console.log('data', JSON.stringify(JSON.parse(data), null, 2))
})
