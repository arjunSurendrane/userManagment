const mongoose = require('mongoose')

const rules = {
    type: String,
    require: [true, 'must enter']
}

const formSchema = new mongoose.Schema({
    name: {
        ...rules,
        unique: true
    },
    address: rules,
    city: rules,
    email: rules,
    phone: {
        type: Number,
        require: [true, 'must enter']
    },
    companyName: rules,
    companyLogo: rules,
    background: rules,
    product: rules,
    problem: rules,
    solution: rules,
    proposition: rules,
    competative: rules,
    revenueModel: rules,
    marketSize: rules,
    productAndService: rules,
    incubationMethod: rules,
    businesProposal: rules,
    status: {
        type: String,
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    BookingDate: {
        type: Date,
        default: new Date()
    }



})



const IncuForm = mongoose.model('Incubulation', formSchema)
module.exports = IncuForm