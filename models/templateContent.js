var mongoose = require("mongoose");

var templateContentObject = {
   headerTag: {
       twitter: String,
       facebook: String,
       linkIn: String,
       instagram: String,
       introNav: String,
       aboutNav: String,
       servicesNav: String,
       blogNav: String,
       teamNav: String,
       footerNav: String
   },
   footerTag: {
       info: String,
       contactUsHead: String,
       contactUs: String,
       twitter: String,
       facebook: String,
       linkIn: String,
       instagram: String,
       formHead: String,
       form: String,
       placeholderName: String,
       placeholderEmail: String,
       placeholderSubject: String,
       placeholderMessage: String,
       formButton: String,
       linksHead: String,
       links: [{
           href: String,
           name: String
       }]
   }
};

var templateContentSchema = new mongoose.Schema(templateContentObject);

module.exports = mongoose.model("TemplateContent", templateContentSchema);

//module.exports = templateContentObject;