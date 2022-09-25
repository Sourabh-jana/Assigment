const http = require('http')
const projects = require('./data-store')

const server = http.createServer((req, res) => {

    if (req.url.match(/\/projects\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        const project = projects.find(function (project) {
            return project.id == id
        })

        if (!project) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(project))
        }
    } else if (req.url !== '/projects') {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Not Found" }))
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "BAD REQUEST" }))
    }
})

const PORT = 8000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))