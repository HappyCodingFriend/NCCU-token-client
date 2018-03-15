let web3 = new Web3()
let fileSystem
let key
let brightness

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {
    alert('device is ready')

    brightness = cordova.plugins.brightness
    //$('#result').html(syntaxHighlight(cordova.file))

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fileSystem = fs
    }, fail)

    $('#brightness').click(() => {
        alert('加強亮度' + $("#number").val()/100)
        brightness.setBrightness($("#number").val()/100, console.log, console.error)
    })

    $("#create").click(() => {
        key = web3.eth.accounts.create()
        $('#key').html(syntaxHighlight(key))
    })

    $("#write").click(() => {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
            createFile(dirEntry, 'test.txt', new Blob([JSON.stringify(key, null, 4)], { type: 'application/json' }), false)
        })
    })

    $("#read").click(() => {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
            dirEntry.getFile('test.txt', { create: true, exclusive: false }, function (fileEntry) {
                readFile(fileEntry)
            })
        })
    })
}

function createFile(dirEntry, fileName, dataObj, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
        writeFile(fileEntry, dataObj, isAppend)
    }, fail);
}

function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function () {
            console.log("Successful file write...")
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString())
        };

        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' })
        }

        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length)
            }
            catch (e) {
                console.log("file doesn't exist!")
            }
        }

        fileWriter.write(dataObj)
        alert('儲存成功')
    })
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader()

        reader.onloadend = function () {
            console.log("Successful file read: " + this.result)
            $('#key').html(syntaxHighlight(JSON.parse(this.result)))
        };

        reader.readAsText(file)

    }, fail)
}

function fail(evt) {
    alert(evt)
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/*
function gotFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail)
}

function gotFileEntry(fileEntry) {
    fileEntry.file(gotFile, fail)
}

function gotFile(file) {
    let reader = new FileReader();
    reader.onloadend = function (evt) {
        alert(evt.target.result)
    }
    reader.readAsText(file)
}

function fail(evt) {
    alert(evt)
}
*/