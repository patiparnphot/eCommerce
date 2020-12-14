var moment  = require("moment-timezone"),
    Good = require("../models/good");

module.exports = async function(slug) {
   console.log(slug);
  try {
     const currentlyGood = await Good.findOne({ slug: slug }).exec();
   //   console.log(currentlyGood);

     try {
        let sameCategoryGoods = await Good.find(
           { category: currentlyGood.category },
           { title: 1, image: 1, rating: 1, cost: 1 },
           { sort: { postedTime: -1 }, limit: 10 }).exec();
        let similarGoods = [];
        if (sameCategoryGoods && sameCategoryGoods.length > 0) {
           for (let i = 0; i < sameCategoryGoods.length; i++) {
             if (sameCategoryGoods[i].title != currentlyGood.title) {
                 similarGoods.push(sameCategoryGoods[i]);
             }
           }
        } else { similarGoods.push(currentlyGood); }
        //let finalSimilarGoods = await Promise.all(similarGoods);
        //console.log("similar: ", similarGoods);

        try {
           let popularGoods;
           popularGoods = await Good.find(
              {},
              { title: 1, image: 1, rating: 1, cost: 1 },
              { sort: { rating: -1 }, limit: 10 }).exec();
           if (!popularGoods || popularGoods.length < 1) {
              popularGoods = [];
              popularGoods.push(currentlyGood);
           }
           //console.log(popularGoods);

           try {
              const recentGoods = await Good.find(
                 { postedTime: { $lt: Date.now() } },
                 { title: 1, image: 1, rating: 1, cost: 1 },
                 { sort: { postedTime: -1 }, limit: 10 }).exec();
              //console.log(recentGoods);
           
              try {
                 let goodDetail = {};
                 goodDetail = {
                  '_id': currentlyGood._id,
                  'descriptionHtml': currentlyGood.descriptionHtml,
                  'titleHtml': currentlyGood.titleHtml,
                  'image': currentlyGood.image,
                  'slug': currentlyGood.slug,
                  'title': currentlyGood.title,
                  'description': currentlyGood.description,
                  'category': currentlyGood.category,
                  'rating': currentlyGood.rating,
                  'ratingAmount': currentlyGood.ratingAmount,
                  'raterAmount': currentlyGood.raterAmount,
                  'postedTime': currentlyGood.postedTime,
                  'options': currentlyGood.options,
                  'specificOptions': currentlyGood.specificOptions,
                  'similarGoods': similarGoods,
                  'popularGoods': popularGoods,
                  'recentGoods': recentGoods
                 };
               //   console.log(goodDetail);
                 return({
                    'slug': currentlyGood.slug,
                    'state': goodDetail
                 });

              } catch (err) {
                 return 'error occur at combineGood';
              }
           } catch (err) {
              return 'error occur at recentGoods';
           }

        } catch (err) {
           return 'error occur at poppularGoods';
        }

     } catch (err) {
        return 'error occur at similarGoods';
     }

  } catch (err) {
     return 'error occur at currentlyGoods';
  }
    
}