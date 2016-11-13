// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START app]
// [START import_libraries]
var Vision = require('@google-cloud/vision');
// [END import_libraries]

// [START authenticate]
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/gcloud-node/#/docs/google-cloud/latest/guides/authentication

// Instantiate a vision client
var vision = Vision();
var db = require('../models/query');

// [END authenticate]

/**
 * Uses the Vision API to detect labels in the given file.
 */
// [START construct_request]
function detectLabels (inputFile, callback) {
  let ingredients = [];
  // Make a call to the Vision API to detect the labels
  vision.detectLabels(inputFile, { verbose: true }, function (err, labels) {
    if (err) {
      return callback(err);
    }
    // console.log(JSON.stringify(labels, null, 2));
    // console.log(labels);
    for (let label of labels){
      ingredients.push(label.desc);
    }
    db.findRecipesWith(ingredients);
    callback(null, labels);
  });
}
// [END construct_request]

// Run the example
function main (inputFile, req, res, next, callback) {
  detectLabels(inputFile, function (err, labels) {
    if (err) {
      return callback(err);
    }
    // console.log(labels);
  });
  return next();
}

exports.main = main;

exports.analyse = function(file, req, res, next){
  main(file, req, res, next, console.log);
}