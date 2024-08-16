export const accountActivationController = async (req, res) => {
    const token = req.params.token;

    console.log(token);
    res.end();
};
