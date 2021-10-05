exports.handler = function (event, context, callback) {
    const secretContent = `
    <h3>Welcome to user's page</h3>
    <p> only registered users</p>
    `
    let body
    if (event.body) {
        body = JSON.parse(event.body);
    } else {
        body = {}
    }
    if (body.password == "JavaScript") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
        })
    }
}