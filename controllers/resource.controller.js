const snowflakeConnectionCredentials = [
    {
        "name" : "Datawarehouse1 connection details",
        "contact" : "somebodyimportant@dentsu.com",
        "host" : "abc.com",
        "password" : "sample password",
        "username" : "fivetran"
    }
]

exports.getCredentials = async (req, res) => {
    try {
      res.status(200).send(snowflakeConnectionCredentials);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};