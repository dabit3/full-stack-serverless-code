/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authServerlessfunctionsic0a69b1cUserPoolId = process.env.AUTH_SERVERLESSFUNCTIONSIC0A69B1C_USERPOOLID
var storageProducttableName = process.env.STORAGE_PRODUCTTABLE_NAME
var storageProducttableArn = process.env.STORAGE_PRODUCTTABLE_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

// cognito stuff
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
var userpoolId = process.env.AUTH_SERVERLESSFUNCTIONSIC0A69B1C_USERPOOLID

// dynamodb setup
const region = process.env.REGION
const ddb_table_name = process.env.STORAGE_PRODUCTTABLE_NAME
const docClient = new AWS.DynamoDB.DocumentClient({region})

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

async function getGroupsForUser(event) {
  let userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
  let userParams = {
    UserPoolId: userpoolId,
    Filter: `sub = "${userSub}"`,
  }
  let userData = await cognito.listUsers(userParams).promise()
  const user = userData.Users[0]
  var groupParams = {
    UserPoolId: userpoolId,
    Username: user.Username
  }
  const groupData = await cognito.adminListGroupsForUser(groupParams).promise()
  return groupData
}

async function canPerformAction(event, group) {
  return new Promise(async (resolve, reject) => {
    if (!event.requestContext.identity.cognitoAuthenticationProvider) {
      return reject()
    }
    const groupData = await getGroupsForUser(event)
    const groupsForUser = groupData.Groups.map(group => group.GroupName)
    if (groupsForUser.includes(group)) {
      resolve()
    } else {
      reject('user not in group, cannot perform action..')
    }  
  })
}

async function getItems(){
  var params = {
    TableName: ddb_table_name,
  }
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

app.get('/products', async function(req, res) {
  try {
    const data = await getItems()
    res.json({
      data: data
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
})

app.post('/products', async function(req, res) {
  const { event } = req.apiGateway
  const { body } = req
  try {
    await canPerformAction(event, 'Admin')
    const input = { ...body, id: uuid() }
    var params = {
      TableName: ddb_table_name,
      Item: input
    }
    await docClient.put(params).promise()
    res.json({
      success: 'item saved to database..'
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
});

app.get('/products/*', function(req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/products', async function(req, res) {
  try {
    var params = {
      TableName: ddb_table_name,
      Key: { id: req.body.id },
      UpdateExpression: 'set price = :newprice',
      ExpressionAttributeValues: { ':newprice': 100 }
    }
    await docClient.update(params).promise()
    res.json({ success: 'successfully updated item' })
  } catch (err) {
    res.json({ error: err })
  }
});

app.put('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/products', async function(req, res) {
  const { event } = req.apiGateway
  try {
    await canPerformAction(event, 'Admin')
    var params = {
      TableName : ddb_table_name,
      Key: { id: req.body.id }
    }
    await docClient.delete(params).promise()
    res.json({ success: 'successfully deleted item' })
  } catch (err) {
    res.json({ error: err })
  }
});

app.delete('/products/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
