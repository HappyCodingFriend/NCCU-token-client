let web3
let storage
let secureStorage
let brightness

let points
let friends

document.addEventListener('deviceready', () => {
	console.log('deviceready')

	web3 = new Web3('http://localhost:8545')
	storage = window.localStorage
	secureStorage = cordova.plugins.SecureLocalStorage
	brightness = cordova.plugins.brightness

	//返回紐
	document.addEventListener("backbutton", (e) => {
		QRScanner.getStatus(function (status) {
			if (status.scanning || status.showing) {
				QRScanner.destroy((status) => {
					$('#app').show()
				})
			} else {
				app.router.back()
			}
		})
	}, false)

	//進入主畫面
	setTimeout(() => {
		$('#app').show()
		$('#logo').hide()
	}, 1000)

}, false)

function checkUser() {
	NativeStorage.getItem('user', user => {
		console.log(user)
	}, err => {
		app.dialog.alert('您尚未登入', '警告', () => {
			app.router.back()
		})
	})
}

function myReadFile(fileName, callback) {

	window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
		dirEntry.getFile(fileName, {
			create: true,
			exclusive: false
		}, function (fileEntry) {
			readFile(fileEntry)
		})
	})

	function readFile(fileEntry) {
		fileEntry.file(function (file) {
			let reader = new FileReader()
			reader.onloadend = function () {
				let key = JSON.parse(this.result)
				callback(key)
			}
			reader.readAsText(file)
		}, (evt) => {
			alert(evt)
		})
	}
}