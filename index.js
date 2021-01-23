const { Telegraf } = require('telegraf')
const rateLimit = require('telegraf-ratelimit')
const monosay = require('monosay').usetelegraf(process.env.MONOSAY_TOKEN)

const limitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) => ctx.reply('Yeter botu çürüttün')
}

const bot = new Telegraf(process.env.BOT_TOKEN)
monosay.init(bot)
bot.use(rateLimit(limitConfig))
bot.start((ctx) => {
    console.log('started:', ctx.from.id)
    monosay.user({
        channelUserId: ctx.from.id,
        name: ctx.from.first_name,
        surname: ctx.from.last_name,
        userName: ctx.from.username
    }, /*success callback*/ null, /*error callback*/ null)
    return ctx.reply('Welcome!')
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('text', (ctx) => ctx.reply('Hello!'))
bot.hears('hi', (ctx) => {
    // if(ctx.from.id !== 1223629707) 
    //     return ctx.reply('I don\'t now you.')
    return ctx.reply('Hey there')
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))