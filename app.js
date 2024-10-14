const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

/***
* Simular peticion async http 1.5 segundos
*/
// const fakeHTTPMenu = async () => {
//   console.log('⚡ Server request!')
//   await delay(1500)
//   console.log('⚡ Server return!')
//   return Promise.resolve([{ body: 'Pago prescencial', media: 'https://iili.io/29qoSsI.jpg' }, { body: 'Pago a distancia', media:'https://iili.io/29qoSsI.jpg'}])
// }

/***
* Simular peticion async http 0.5 segundos
*/
// const fakeHTTPPayment = async () => {
//   const link = `https://www.buymeacoffee.com/leifermendez?t=${Date.now()}`
//   console.log('⚡ Server request!')
//   await delay(500)
//   console.log('⚡ Server return!')
//   return Promise.resolve([
//       { body: `Puedes hacer un *pago* en el siguiente link: ${link}` },
//   ])
// }

// const flujoMarca = addKeyword(['Surrey', 'Midea', 'York']).addAnswer(
//   'Ok te espero con los billetes'
// )
// const flujoFrigorias = addKeyword(['2250','3000','4500','7000','9000','15000','18000']).addAnswer(
//     ['¿Marca? ', 'Surrey', 'Midea', 'York'],
//     { delay: 1500 },
//     null,
//    [flujoMarca]
//   );
  
//   const flujoTecnologia = addKeyword(['inverter', 'on/off']).addAnswer(
//     ['¿De cuántas frigorías?','2250','3000','4500','7000','9000','15000','18000'],
//     { delay: 1500 },
//     null,
//     [flujoFrigorias]
//   );
  
//   const flujoSaludoInicial = addKeyword(['hola', 'ole', 'buenas'])
//     .addAnswer('Bienvenido al restaurante *La cuchara de palo 🙌*')
//     .addAnswer('👉 Escribe la tecnología que buscas, *Inverter* u *ON/OFF*', { delay: 1500 }, null, [
//       flujoTecnologia,
//     ]);

    const flowPrincipal = addKeyword('quiero más información')
    .addAnswer(
        [
            '👋 Hola, bienvenido a *Surair Climatización* 😊', 
            '📍 Nos encontramos en *Pedro Pico 276*, Bahía Blanca',
    ],
    )
    .addAnswer( '🙋‍♀️ Mi Nombre es Milva, soy asesora comercial de la empresa')
    .addAnswer('Te comparto las opciones de pago que tenemos disponibles actualmente')
    .addAnswer('A distancia 💸',
        {
            media: 'https://iili.io/29qoSsI.jpg'
        }
    )
    .addAnswer('Pago presencial 💳',
        {
            media: 'https://iili.io/dyr6EPt.jpg'
        }
    )
    .addAnswer('¿Estás buscando algún equipo en particular?')

  

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
  })

  QRPortalWeb()
}

main()
