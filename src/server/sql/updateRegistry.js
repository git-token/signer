import Promise from 'bluebird'

/**
 * [updateRegistry description]
 * @param  {Number} [deployed=1]       [description]
 * @param  {String} [organization=""]  [description]
 * @param  {String} [token_address=""] [description]
 * @param  {[type]} [date_deployed=0}] [description]
 * @return [type]                      [description]
 */
export default function updateRegistry({
  deployed=1,
  organization="",
  token_address="",
  date_deployed=new Date().getTime()
}) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      UPDATE registry
      SET
        deployed = "${deployed}",
        token_address = "${token_address}",
        date_deployed = ${date_deployed}
      WHERE organization = "${organization}";
    `, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
