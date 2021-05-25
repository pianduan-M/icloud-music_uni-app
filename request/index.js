const bese_url = 'https://freehome.top/icloudMusic'

export default function request(params) {

	let CookieSrt = uni.getStorageSync('Cookie');
	if (CookieSrt) {

		CookieSrt = CookieSrt.split(";").find(item => item.indexOf("MUSIC_U") !== -1)
		
		if (CookieSrt && params.header && Object.keys(params.header).length > 0) {
			params.header.Cookie = CookieSrt
		} else if (CookieSrt) {
			params.header = {
				Cookie: CookieSrt
			}
		}
	}


	// if (params.data && Object.keys(params.data).length > 0) {
	//   params.data.proxy = 'your-proxy'
	// } else {
	//   params.data = {
	//     proxy: 'your-proxy'
	//   }
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: bese_url + params.url,
			success: (result) => {
				if(result.data.code === 301 ){
					uni.navigateTo({
						
					})
				}
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
		});
	})
}
