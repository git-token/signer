import Promise from 'bluebird'

export default function handleMsg(msg) {
    return new Promise((resolve, reject) => {
      let { event, data } = JSON.parse(msg.toString())
      switch(event) {
        case 'sign_transaction':
          this.wallet.signTransaction({ ...data }).then((signedTx) => {
            this.socket.write(JSON.stringify({ event, result: signedTx, message: 'Transaction Signed' }))
            return null;
          }).catch((error) => {
            console.log('error', error)
            this.socket.write(JSON.stringify({ error: error.message }))
          })
          break;
        case 'sign_message':
          this.wallet.signMessage({ ...data }).then((signedMsg) => {
            this.socket.write(JSON.stringify({ event, result: signedMsg, message: 'Message Signed' }))
            return null;
          }).catch((error) => {
            console.log('error', error)
            this.socket.write(JSON.stringify({ error: error.message }))
          })
          break;
        case 'get_address':
          this.wallet.getAddress().then((address) => {
            this.socket.write(JSON.stringify({ event, result: address, message: 'Signer Address' }))
            return null;
          }).catch((error) => {
            console.log('error', error)
            this.socket.write(JSON.stringify({ error: error.message }))
          })
          break;
        case 'deploy_contract':
          this.deployContract({ ...data }).then((txReceipt) => {
            this.socket.write(JSON.stringify({ event, result: txReceipt, message: 'GitToken Contract Deployed' }))
          }).catch((error) => {
            this.socket.write(JSON.stringify({ error: error.message }))
          });
          break;
        case 'reward_contributor':
          this.rewardContributor({ ...data }).then((txReceipt) => {
            this.socket.write(JSON.stringify({ event, result: txReceipt, message: 'Contributor Rewarded' }))
          }).catch((error) => {
            this.socket.write(JSON.stringify({ error: error.message }))
          });
          break;
        default:
          this.socket.write(JSON.stringify({ event: 'invalid_event', result: null, message: `Invalid event: ${event}` }))
      }
    })
}
