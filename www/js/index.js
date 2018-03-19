let web3
let storage
let brightness

document.addEventListener('deviceready', () => {
	console.log('deviceready')

	web3 = new Web3('http://localhost:8545')
	storage = window.localStorage
	brightness = cordova.plugins.brightness

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

	document.addEventListener('online', () => {
		alert('online')
		this.$app.statusbar.hide()
	}, false)

	document.addEventListener('offline', () => {
		alert('offline')
		this.$app.statusbar.show()
	}, false)

}, false)

function myReadFile(fileName, callback) {
	//讀取key file
	window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
		dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
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