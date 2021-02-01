var moment   = require("moment-timezone"),
    Category = require("../models/category");

module.exports = async function(title) {
   console.log(title);
   try {
      const goodCategory = await Category.findOne({ categoryType: "good", title: title }).exec();
      //   console.log(currentlyGood);

      try {
         return({
            'title': goodCategory.title,
            'state': goodCategory
         });

      } catch (err) {
         return 'error occur at combineGoodCategory';
      }
           

   } catch (err) {
      return 'error occur at fetchGoodCategory';
   }
    
}