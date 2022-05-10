const Mail = require("./mail")

jest.setTimeout(300000)

test('sendmail', async () => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "growth@carrefour.com",
            pass: "rwjkxfuvtnzpxocl",
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    let mail = new Mail(transport)
    mail.setTitle('This is great!')
    mail.clearNotes()
    mail.addNote('Don\'t forget to like and share !')
    mail.setGreeting('Hello,')
    mail.setClosing('Cheers')

    await mail.send('alexandre_costantini@carrefour.com', 'test', 'test')

    await mail.send(transport, ['alexandre_costantini@carrefour.com'], 'test', 'test')

    await mail.send(transport, [], 'test', 'test')

    await mail.send(transport, null, 'test', 'test')

    await mail.send(transport, '', 'test', 'test')

    mail = new Mail(null)
    await mail.send('alexandre_costantini@carrefour.com', 'test', 'test')

    mail = new Mail({})
    await mail.send({}, 'alexandre_costantini@carrefour.com', 'test', 'test')
})
