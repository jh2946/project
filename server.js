const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const upload = multer({ dest: 'uploads/' })
const { PrismaClient } = require('@prisma/client')
const app = express()
const port = 3000
const hostname = 'localhost'
const prisma = new PrismaClient()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/endpoint', async (req, res) => {
    res.json(await prisma.deck.findMany({
        orderBy: { created: 'desc' }
    }))
})

app.post('/create.html', async (req, res) => {
    let id = crypto.randomBytes(8).toString('base64url')
    while (await prisma.deck.findUnique({ where: { id } })) {
        id = crypto.randomBytes(8).toString('base64url')
    }
    await prisma.deck.create({
        data: {
            id,
            meta: JSON.stringify(req.body)
        }
    })
    res.redirect(`/deck.html?id=${id}`)
})

app.get('/deck/endpoint', async (req, res) => {
    const data = await prisma.card.findMany({
        where: {
            deckId: req.query.id
        },
        orderBy: { created: 'asc' }
    })
    res.json(data)
})

const fields = upload.fields([
    { name: 'file-front', maxCount: 1 },
    { name: 'file-back', maxCount: 1 }
])
app.post('/deck.html', fields, async (req, res) => {
    let id = crypto.randomBytes(16).toString('base64url')
    while (await prisma.deck.findUnique({ where: { id } })) {
        id = crypto.randomBytes(16).toString('base64url')
    }
    let meta = req.body
    for (const entry in req.files) {
        meta[entry] = req.files[entry][0].path.replace('\\', '/')
    }
    await prisma.card.create({
        data: {
            id,
            meta: JSON.stringify(meta),
            deckId: req.query.id
        }
    })
    res.redirect('back')
})

app.listen(port, hostname, () => console.log(`Server ready at ${hostname}:${port}`))
