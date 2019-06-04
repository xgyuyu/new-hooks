// 给get方法拼接参数
export function getUrl(url, params) {
    if (params) {
      let paramsArray = []
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    return url
  }
  
  // async
  export async function fetchApi(url, configObj){
    return await fetch(url, Object.assign(configObj))
    // const res = await fetch(url, Object.assign(configObj))
    /* .then(function(res){
      return res
    }) */
    /* .catch(function(err){
      console.log(err)
      return err
    }) */
    // return res.json()
  }