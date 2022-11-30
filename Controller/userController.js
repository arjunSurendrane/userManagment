const IncuForm = require("../Models/incubulationModel")

exports.userRequestDetails = async (req, res) => {
    try {
        const incubation = await IncuForm.findOne({ userId: req.user._id }).populate('userId')
        res.json({
            incubation
        })
    } catch (error) {
        res.json({
            error
        })

    }
}