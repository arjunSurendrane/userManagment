function response(msg, data, status, res) {
    res.status(status).json({
        data,
        message: msg,
    });
}

module.exports = response