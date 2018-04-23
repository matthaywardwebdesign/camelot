# camelot
A super simple, easy to deploy HTML to PDF microservice (powered by Puppeteer)

### Running
To start camelot in development mode run `npm run dev`

### Example request
#### Converting raw HTML to pdf
POST `http://localhost:7331/raw`

**Request**
```json
{
  "html": "<h1>Hello world</h1>"
}
```

**Response**
```json
{
  "path":"/docs/f5995286-9fc5-4e21-971c-269390c109de.pdf"
}
```

**Options**
- html `<String> (Required) The raw HTML string`
- sendFile `<Boolean> Whether or not to return the generated PDF directly instead of just a URL`

### Running under Docker
Simply run `docker-compose up`
