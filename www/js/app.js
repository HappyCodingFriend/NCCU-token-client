// Dom7
let $ = Dom7

// Init App
let app = new Framework7({
	root: '#app',
	id: 'com.myapp.test',
	name: '政大點數',
	theme: 'auto',
	version: '1.0.2',
	language: 'zh-Hant',
	data: function () {
		return {
			server: {
				protocol: 'http',
				ip: '150.116.233.133',
				port: '50000',
			}
		};
	},
	methods: {
		helloWorld: function () {
			app.dialog.alert('Hello World!');
		},
	},
	routes: routes,
	vi: {
		placementId: 'pltd4o7ibb9rc653x14',
	},
	touch: {
		fastClicks: false,
	},
	panel: {
		swipe: 'left',
	},
})
