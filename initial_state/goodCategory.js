var moment   = require("moment-timezone"),
    Category = require("../models/category"),
    Good     = require("../models/good"),
    handler  = require("../data_handler");

module.exports = async function(title) {
   console.log(title);
   try {
      // const goodCategory = await Category.findOne({ categoryType: "good", title: title }).exec();
      let goodCategory = await handler.findByGoodCatName(title);
      //   console.log(currentlyGood);
      // const filterGoods = await Good.find({category: title}, {}, { sort: { postedTime: -1 } }).exec();
      const filterGoods = await handler.findBySimilarGoods(title, 10);

      try {
         return({
            'title': goodCategory.title,
            'state': {
               content: goodCategory,
               goods: filterGoods
            }
         });

      } catch (err) {
         return 'error occur at combineGoodCategory';
      }
           

   } catch (err) {
      return 'error occur at fetchGoodCategory';
   }
    
}