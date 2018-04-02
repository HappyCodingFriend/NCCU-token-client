let api = {

    //sign
    signIn: (ID, password, success) => {
        app.request.post(getUrl('signIn'), {
            ID,
            password,
        }, success, (xhr, status) => {
            console.error(status)
        }, 'json')
    },

    signUp: (signUpData, callback) => {
        app.request.post(getUrl('signUp'), signUpData, (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, (xhr, status) => {
            console.error(status)
        }, 'json')
    },

    //user
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

    //Friend
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

    //point
    getPoints: (callback) => {
        app.request.get(getUrl('points', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            points = data
            callback()
        }, 'json')
    },

    getPoint: (address, callback) => {
        app.request.get(getUrl('point/' + address, { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    //transaction
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

    postTransaction: (signTx, targetID, number, point, callback) => {
        app.request.post(getUrl('transaction', { token: user.token }), {
            signTx,
            targetID,
            number,
            point,
        }, (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, (xhr, status) => {
            console.error(status)
        }, 'json')
    },

    //order
    getOrders: (callback) => {
        app.request.get(getUrl('orders', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    getOrder: () => {
        app.request.get(getUrl('order', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    addOrder: (signTx, point1, value1, point2, value2, callback) => {
        app.request.post(getUrl('order', { token: user.token }), {
            signTx,
            point1,
            value1,
            point2,
            value2,
        }, (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, (xhr, status) => {
            console.error(status)
        }, 'json')
    },

    updateOrder: (signTx, autoID, callback) => {
        app.request({
            url: getUrl('order', { token: user.token }),
            method: 'PUT',
            data: {
                signTx,
                autoID,
            },
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

    //nonce
    getNonce: (callback) => {
        app.request.get(getUrl('nonce', { token: user.token }), (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    }
}



