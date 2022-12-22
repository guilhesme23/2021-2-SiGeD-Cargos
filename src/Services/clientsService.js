const { APIClients } = require('./BaseService')

const getUsersWithRole = async (roleName, token) => {
    try {
        const clients = await APIClients.get(`/clients`, {
          headers: {
            "x-access-token": token,
          },
        }).then((response) => response.data);

        const result = clients.filter(client => {
            return client.office == roleName
        })

        return result

    } catch(err) {
        console.log(err.toJSON())
        return "Could not connect to users api"
    }
}

module.exports = {
    getUsersWithRole
}