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