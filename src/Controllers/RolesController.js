const { getUser } = require('../Services/Axios/clientService');

const sampleGet = async(req, res) => {
    return res.status(200).json({ 'response': 'Ok' })
};
module.exports = {
    sampleGet
};