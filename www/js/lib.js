function toJSON(object) {
    return JSON.parse(JSON.stringify(object))
}

function getUrl(path, query) {
    let server = app.data.server
    let url = `${server.protocol}://${server.ip}:${server.port}/${path}`
    if (query) {
        url += '?'
        for (let i in query) {
            url += `${i}=${query[i]}&`
        }
        url = url.substring(0, url.length - 1)
    }
    return url
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