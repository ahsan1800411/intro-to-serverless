const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const newTodo = {
    id: v4(),
    todo,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  await dynamodb
    .put({
      TableName: TodoTable,
      Item: newTodo,
    })
    .promise();
  return {
    statusCode: 201,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser()),
};
