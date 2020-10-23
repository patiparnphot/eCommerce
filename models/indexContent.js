var mongoose = require("mongoose");

var indexContentObject = {
   titleHtml: String,
   descriptionHtml: String,
   intro: {
       slogan: String,
       button: String,
       image: String,
       href: String
   },
   about: {
       image: String,
       content: String
   },
   services: {
       header: String,
       boxes: [{
           icon: String,
           iconColor: String,
           bgColor: String,
           title: String,
           href: String,
           description: String
       }]
   },
   whyUs: {
        header: String,
        image: String,
        content: String,
        topics: [{
            icon: String,
            iconColor: String,
            content: String
        }],
        counters: [{
            amount: String,
            text: String
        }]
    },
    callToAction: {
        title: String,
        text: String,
        href: String,
        button: String
    },
    features: [{
        image: String,
        content: String
    }],
    testimonials: {
        header: String,
        carousel: [{
            image: String,
            name: String,
            position: String,
            text: String
        }]
    },
    team: {
        header: String,
        members: [{
            image: String,
            name: String,
            position: String,
            twitter: String,
            facebook: String,
            linkIn: String
        }]
    },
    clients: {
        header: String,
        carousel: [{
            image: String
        }]
    },
    pricing: {
        header: String,
        packages: [{
            currency: String,
            price: String,
            period: String,
            title: String,
            listGroup: String,
            href: String,
            button: String
        }]
    },
    faq: {
        header:String,
        list: [{
            question:String,
            answer:String
        }]
    }
};

var indexContentSchema = new mongoose.Schema(indexContentObject);

module.exports = mongoose.model("IndexContent", indexContentSchema);

//module.exports = indexContentObject;