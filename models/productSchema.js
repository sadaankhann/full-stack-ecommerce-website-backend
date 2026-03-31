const {productSchema} = require('../config/db.js');

const mongoose = require('mongoose');

const Products = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        table_data : {
            model : {
                type : String,
                default : "#8786867"
            },
            style : {
                type : String,
                default : "Classic style",
            },
            certificate : {
                type : String,
                default : "ISO-898921212"
            },
            size : {
                type : String,
                default : "34mm x 450mm x 19mm"
            },
            memory : {
                type : String,
                default :"36GB RAM"
            }
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String
        },

        isFeatured: {
            type: String,
            default: "false"
        },

        type : {
            type : String,
            default : "Classic"
        },

        material : {
            type: String,
            default : "Good"
        },

        design : {
            type: String,
            default : 'Modern'
        },

        customization : {
            type: String,
            default : "Customized logo and design custom packages"
        },

        protection : {
            type: String,
            default : "Refund Policy"
        },

        warranty : {
            type: String,
            default : "2 years full warranty "
        },

        shipping : {
            type: String,
            default : "Free Shipping"
        }

    },
    {
        timestamps : true
    }
)

module.exports = productSchema.model('Product', Products);