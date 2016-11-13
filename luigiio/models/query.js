"use strict";

var mongoose = require('../conf/database');
var querySchema = mongoose.Schema({

  name: String,
  ingridients: [String]
});

var model = mongoose.model('query', querySchema);

function getUniques(base, reference){
  let uniques = [];
  for(let x of base){
    if(reference.indexOf(x) == -1 && uniques.indexOf(x) == -1)
      uniques.push(x);
  }
  return uniques;
}

exports.updateStreams = function(streamId, previousString, newString){
  let previous = previousString.split(',');
  let news = newString.split(',');

  let toDelete = getUniques(previous, news);
  let toAdd = getUniques(news, previous);

  for(let query of toDelete) {
    model.update(
      {query: query},
      {$pull: {streams: streamId}},
      {multi: false},
      (res, lol)=> {
        console.log(res, lol);
      }
    );
  }
  for(let query of toAdd){
    model.findOne({query: query}, (err, queryObj)=> {
      var updateQuery;
      if(err || !queryObj)
        updateQuery = model({query: query});
      else
        updateQuery = queryObj;
      
      updateQuery.streams.push(streamId);
      updateQuery.save();
    });
  }
};