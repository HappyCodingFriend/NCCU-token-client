let api = {

    signIn: (ID, password, success) => {
        app.request.post(getUrl('signIn'), {
            ID,
            password,
        }, success, (xhr, status) => {
            console.error(status)
        }, 'json')
    },

    signUp: () => {

    },

    getUser: (ID, callback) => {
        app.request.get(getUrl('user', { token: user.token, ID: ID }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    updateUser: (address) => {
        app.request({
            url: getUrl('user', { token: user.token }),
            method: 'PUT',
            data: {
                address,
            },
            success: (data, status, xhr) => {
                console.log(status)
            },
            error: (xhr, status) => {
                console.error(status)
            },
            dataType: 'json',
        })
    },

    //取得朋友列表
    getFriends: (callback) => {
        app.request.get(getUrl('friends', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            friends = data
            callback()
        }, 'json')
    },

    addFriend: (friendID, callback) => {
        app.request({
            url: getUrl('friend/' + friendID, { token: user.token }),
            method: 'POST',
            success: (data, status, xhr) => {
                console.log(status, data)
                callback(data)
            },
            error: (xhr, status) => {
                console.error(status)
            },
            dataType: 'json',
        })
    },

    deleteFriend: () => {
        app.request({
            url: getUrl('friend', { token: user.token }),
            method: 'DELETE',
            data: {
                address,
            },
            success: (data, status, xhr) => {
                console.log(status)
            },
            error: (xhr, status) => {
                console.error(status)
            },
            dataType: 'json',
        })
    },

    //取得點數列表
    getPoints: (callback) => {
        app.request.get(getUrl('points', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            points = data
            callback()
        }, 'json')
    },

    //取的點數餘額
    getPoint: (address, callback) => {
        app.request.get(getUrl('point/' + address, { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    getTransactionsTo: (callback) => {
        app.request.get(getUrl('query/transactionsTo', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    getTransactionsFrom: (callback) => {
        app.request.get(getUrl('query/transactionsFrom', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    getNonce: (callback) => {
        app.request.get(getUrl('nonce', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    }
}



