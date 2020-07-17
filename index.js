const express = require('express')
const axios = require('axios')

const app = express()

const port = 3000

const onListen = () => console
  .log(`Listening on :${port}`)

function render (heading, content) {
  const page = `<html>
    <head>
      <title>Userdashboard</title>
      <style>
        a { color: red }
      </style>
    </head>
    <body>
      <h1>${heading}</h1>
      ${content}
    </body>
  </html>`

  return page
}

function section (title, content) {
  return `<h4>${title}</h4>
  <p>${content}</p>`
}

app.get('/', async (request, response) => {
  try {
    const result = await axios .get('http://localhost:4000/') 
    // this is the JSON
    const { data } = result
    // result.data is the JSON

    const paragraphs = data
      .map(user => `<p><a href="/${user.name}">${user.name}</a></p>`)

    const lines = paragraphs.join('\n')

    const page = render('Users', lines)

    response.send(page)
  } catch (error) {
    console.log(error)
  }
})

app.get('/:username', async function (request, response) {
  try {
    const { username } = request.params

    const url = `http://localhost:4000/user/${username}`

    const result = await axios.get(url)

    const { data } = result

    const website = section(
      'Last website visted',
      data.website
    )

    const hours = section(
      'Hours online per day',
      data.hours
    )

    const content = `${website}${hours}`

    const heading = `<a href="/">${data.name}</a>`

    const page = render(heading, content) 

    response.send(page)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, onListen)

// Express HTML viewserver
// Show browsable information about user behavior online
// Two pages
// Home page - all the user names
// Detail page - all the information for 1 user