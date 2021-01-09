const Telegraf = require('telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()