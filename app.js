const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword('quiero más información')
    .addAnswer(
        [
            '👋 Hola, bienvenido a *Surair Climatización* 😊', 
            '📍 Nos encontramos en *Pedro Pico 276*, Bahía Blanca',
    ],
    )
    .addAnswer( '🙋‍♀️ Mi Nombre es Milva, soy asesora comercial de la empresa')
    .addAnswer('Te comparto las opciones de pago que tenemos disponibles actualmente',
        {
            media: 'https://iili.io/dpETyts.jpg'
        }
    )
    .addAnswer('¿Estás buscando algún equipo en particular?')
    
    const main = async () => {
        try {
            const adapterDB = new MockAdapter()
            const adapterFlow = createFlow([flowPrincipal])
            const adapterProvider = createProvider(BaileysProvider)
    
            await createBot({
                flow: adapterFlow,
                provider: adapterProvider,
                database: adapterDB,
            })
    
            QRPortalWeb()
    
        } catch (err) {
            console.error('Error en el bot:', err)
        }
    }
    
    main()
