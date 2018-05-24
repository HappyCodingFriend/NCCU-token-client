let web3
let storage
let secureStorage
let brightness
let notification

let myData = {}

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
	notification = cordova.plugins.notification

	NativeStorage.getItem('user', user => {
		console.log('讀取使用者成功')

		app.request.get(getUrl('check', { token: user.token }), (data, status, xhr) => {
			console.log('登入成功')
			console.log(status, data)

			init(user)
			QRScanner.prepare(onDone)

		}, (xhr, status) => {
			console.log('登入失敗')
			console.log(status)
			app.router.navigate('/signIn/')
		}, 'json')
	}, (err) => {
		console.log('無使用者紀錄')
		app.router.navigate('/signIn/')
	})
}

function onPause() {
	console.log('pause')
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
		}
		else if (app.dialog.get()) {
			//app.dialog.close()
		}
		else if (app.popup.get()) {
			app.popup.close()
		}
		else {
			app.router.back()
		}
	})
}

function onDone(err, status) {
	if (err) {
		console.error(err);
	}
	else {
		if (status.authorized) {
			console.log('authorized')
		} else if (status.denied) {
			console.log('denied')
		} else {
			console.log('next time')
		}
	}
}

function init(user) {
	console.log(user)
	myData.user = user

	api.getFriends((friends) => {
		console.log('讀取朋友成功')
		myData.friends = friends
	})

	api.getPoints((points) => {
		console.log('讀取點數成功')
		myData.points = points
		myData.pointMap = new Map()
		for (let i in points) {
			myData.pointMap.set(points[i].address, points[i].name)
		}
	})

	$('.profile_block img').attr('src', `imgs/${myData.user.ID}.jpg`)
	$('.profile_block p').eq(0).text(myData.user.name)
	$('.profile_block p').eq(1).text(myData.user.email)
}