const AWS = require('aws-sdk');

const updateTodo = async (event) => {
  const { id } = event.pathParameters;
  const { completed } = JSON.parse(event.body);

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb
    .update({
      TableName: 'TodoTable',
      Key: { id },
      UpdateExpression: 'set completed = :completed',
      ExpressionAttributeValues: {
        ':completed': completed,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      msg: 'Resource Updated',
    }),
  };
};

module.exports = {
  handler: updateTodo,
};
