const http = require('http');
const { syncGithubToAsana } = require('./lib/sync.js');
// const asanaToken = process.env.ASANA_ACCESS_TOKEN;
// const asana = require('asana');
// const client = asana.Client.create({ defaultHeaders: { 'asana-enable': 'string_ids,new_sections' },}).useAccessToken(asanaToken);

// client.dispatcher.debug(true);

const dev = async (body) => {
  try {
      await syncGithubToAsana(JSON.parse(body));
      return {
          statusCode: 200,
          body: JSON.stringify('Completed!'),
      };
  } catch (e) {
      console.log(`Error: ${e}`);
      return {
          statusCode: 500,
          body: JSON.stringify(`Error occurred: ${e}`),
      };
  }
}

const server = http.createServer((req, res) => {
  // This function is called once the headers have been received
  res.setHeader('Content-Type', 'application/json');

  let body = '';

  req.on('data', (data) => {
    // This function is called as chunks of body are received
    body += data;
  });

  req.on('end', () => {
    // This function is called once the body has been fully received

    try {
      console.log('about to make call to dev(req)');
      dev(body);
      console.log('dev(req) done!');
      res.end(JSON.stringify({
        error: false
      }));
    } catch (e) {
      res.statusCode = 500;
      res.end(`Error occurred: ${e}`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});