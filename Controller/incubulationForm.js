const IncuForm = require('../Models/incubulationModel')


exports.formSubmition = async (req, res) => {
    try {
        console.log(req.user)
        const incubulation = await IncuForm.create({ ...req.body, userId: req.user._id })
        res.json({
            incubulation
        })
    } catch (err) {
        console.log(err)
        res.json({
            error: err
        })
    }


}


exports.requests = async (req, res) => {
    try {
        const incubulation = await IncuForm.find({ status: 'pending' }).populate('userId')
        res.json({
            incubulation
        })
    } catch (error) {
        res.json({
            error
        })
    }
}


exports.approved = async (req, res) => {
    try {
        const incubulation = await IncuForm.find({ status: 'Approved' }).populate('userId')
        res.json({
            incubulation
        })
    } catch (error) {
        res.json({
            error
        })
    }
}


exports.booked = async (req, res) => {
    try {
        const incubulation = await IncuForm.find({ status: 'Booked' }).populate('userId')
        res.json({
            incubulation
        })
    } catch (error) {
        res.json({
            error
        })
    }
}