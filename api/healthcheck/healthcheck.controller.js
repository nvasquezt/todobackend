

function index(req, res) {
    res.send({
      message: "Welcome to the healthcheck API"
    });
}


module.exports = {
    index,
};
