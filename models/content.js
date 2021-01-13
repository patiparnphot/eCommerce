var mongoose = require("mongoose");

var indexContentObject = {
    titleHtml: String,
    descriptionHtml: String,
    intro: {
        slideshows: [{
            header: String,
            description: String,
            link: String,
            btnLink: String,
            image: String,
            campaign: String,
            tag: String
        }]
    },
    recent: {
        parallaxText: String,
        header: String
    },
    campaign: {
        title: String,
        subTitle: String,
        btnText: String,
        btnLink: String,
        parallaxImage: String
    },
    popularOnShop: {
        sidebarImage: String,
        categoryHead: String,
        categories: [{
            topic: String,
            link: String
        }]
    },
    blogs: {
        header: String,
        subHeader: String,
        parallaxText: String
    },
    information: {
        title: String,
        text: String,
        parallaxImage: String
    }
};

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

var blogDetailContentObject = {
    headerLine: String,
    homeBreadcrumb: String,
    blogDetailBreadcrumb: String,
    previousBlogNav: String,
    NxtBlgNav: String,
    categoryHead: String,
    recentPostHead: String
};

var contentObject = {
    contentType: String,
    content: Object,
    postedTime: { type: Date, default: Date.now }
}

var contentSchema = new mongoose.Schema(contentObject);

module.exports = mongoose.model("Content", contentSchema);

//module.exports = indexContentObject;