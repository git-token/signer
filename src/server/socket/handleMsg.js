import Promise from 'bluebird'

export default function handleMsg(_msg) {
  console.log('handleMsg::_msg', _msg)
  const msg = JSON.parse(_msg)
  console.log('handleMsg::msg', msg)
  let { event, data, id } = msg
  switch(event) {
    case 'sign_transaction':
      this.wallet.signTransaction({ ...data }).then((signedTx) => {
        this.socket.write(JSON.stringify({ id, event, result: signedTx, message: 'Transaction Signed' }))
        return null;
      }).catch((error) => {
        console.log('error', error)
        this.socket.write(JSON.stringify({ id, event: 'error', result: error }))
      })
      break;
    case 'sign_message':
      this.wallet.signMessage({ ...data }).then((signedMsg) => {
        this.socket.write(JSON.stringify({ id, event, result: signedMsg, message: 'Message Signed' }))
        return null;
      }).catch((error) => {
        console.log('error', error)
        this.socket.write(JSON.stringify({ id, event: 'error', result: error }))
      })
      break;
    case 'get_address':
      this.wallet.getAddress().then((address) => {
        this.socket.write(JSON.stringify({ id, event, result: address, message: 'Signer Address' }))
        return null;
      }).catch((error) => {
        console.log('error', error)
        this.socket.write(JSON.stringify({ id, event: 'error', result: error }))
      })
      break;
    case 'deploy_contract':
      this.deploy({ ...data }).then((txReceipt) => {
        this.socket.write(JSON.stringify({ id, event, result: txReceipt, message: 'GitToken Contract Deployed Transaction Receipt' }))
      }).catch((error) => {
        console.log('error', error)
        this.socket.write(JSON.stringify({ id, event: 'error', result: error }))
      });
      break;
    case 'sign_contract_transaction':
      this.transaction({ ...data }).then((txReceipt) => {
        this.socket.write(JSON.stringify({ id, event, result: txReceipt, message: 'GitToken Contract Method Transaction Receipt' }))
      }).catch((error) => {
        this.socket.write(JSON.stringify({ id, event: 'error', result: error }))
      });
      break;
    default:
      this.socket.write(JSON.stringify({ id, event: 'invalid_event', result: null, message: `Invalid event: ${event}` }))
  }
}
