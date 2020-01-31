<<<<<<< HEAD
exports.invalidRoute = (req, res, next) => {
    let err = new Error("Route not found!");
    err.status = 404;
    return next(err);
}

exports.wrapErr = (err, req, res, next) => {
=======
exports.handle = (err, req, res) => {
    console.log(err);
>>>>>>> test message
    return res.status(err.status || 500).json({
        errorMsg: err.message || "Oops! Something went wrong!"
    })
}
