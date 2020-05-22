const paginatedResults = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) { //make next object
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) { //make previous object
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        results.totalRecords = await model.countDocuments({});
        res.paginatedResults = results
        next()
      } catch (err) {
        res.status(500).send("Server Error");
      }
    }
  }

module.exports = paginatedResults;
