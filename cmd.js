const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function d() {
    await prisma.deck.deleteMany({  })
    console.log('deck cleared')
}

async function c() {
    await prisma.card.deleteMany({  })
    console.log('card cleared')
}
d()