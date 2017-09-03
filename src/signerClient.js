import net from 'net'

export default class GitTokenSignerClient {
  constructor({ signerIpcPath }) {
    this.signerIpcPath = signerIpcPath
    this.signerConnect()
  }

  signerConnect() {
    this.signer = net.connect(this.signerIpcPath)
    this.signer.on('connect', () => {
      console.log('Connected to GitToken Signer')
      this.signer.write(JSON.stringify({ event: 'get_address' }))
      this.signer.on('data', (msg) => {
        const { event, result } = JSON.parse(msg)
        if (event == 'get_address') {
          console.log('GitToken Signer Address: ', result)
          this.signerAddress = result
        }
      })
    })

    this.signer.on('error', () => {
      console.log('Connection Error to GitToken Signer.')
      this.signerReconnect()
    })

    this.signer.on('end', () => {
      console.log('Connection to GitToken Signer Closed.')
      this.signerReconnect()
    })
  }

  signerReconnect() {
    console.log('Attempting to Reconnect in 15 seconds...')
    setTimeout(() => {
      console.log('Attempting to Reconnect.')
      this.signerConnect()
    }, 1000 * 15)
  }
}
