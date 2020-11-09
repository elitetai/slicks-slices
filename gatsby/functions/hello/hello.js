// example of how to write a serverless function

exports.handler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200,
    body: 'Hello!!',
  };
};
