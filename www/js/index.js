let web3
let storage
let secureStorage
let brightness

let friends
let points
let pointMap = new Map()

let user
let setting = {}

document.addEventListener("deviceready", onDeviceReady, false)
document.addEventListener("pause", onPause, false)
document.addEventListener("resume", onResume, false)
document.addEventListener("backbutton", onBackbutton, false)

function onDeviceReady() {
	console.log('deviceready')

	web3 = new Web3()
	storage = window.localStorage
	secureStorage = cordova.plugins.SecureLocalStorage
	brightness = cordova.plugins.brightness

	NativeStorage.getItem('setting', item => setting = item, console.error)

	NativeStorage.getItem('user', item => {
		app.request.get(getUrl('check', { token: item.token }), (data, status, xhr) => {
			console.log(status, data)
			//登入確認
			user = item
			api.getFriends()
			api.getPoints(() => {
				pointMap = new Map()
				for (let i in points) {
					pointMap.set(points[i].address, points[i].name)
				}
			})

			$('#app').show()
			$('#logo').hide()
		}, (xhr, status) => {
			console.log(status)
			$('#app').show()
			$('#logo').hide()
			app.router.navigate('/signIn/')
		}, 'json')
	}, err => {
		//尚未登入
		$('#app').show()
		$('#logo').hide()
		app.router.navigate('/signIn/')
	})
}

function onPause() {
	console.log('pause')
	NativeStorage.setItem('setting', setting, console.log, console.error)
}

function onResume() {
	console.log('resume')
}

function onBackbutton() {
	QRScanner.getStatus(function (status) {
		if (status.scanning || status.showing) {
			QRScanner.destroy((status) => {
				$('#app').show()
			})
		} else {
			app.router.back()
		}
	})
}