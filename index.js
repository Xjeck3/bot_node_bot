const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = '5285865431:AAH6VS3q2ptwMregCmODM9eOEqQ1kNotE9Q'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId,`Сейчас я загадываю цифру от 0 до 9, а ты должен ее угадать.`)
    const randomNumber = Math.floor((Math.random()*10))
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId,'Отгадывай число!',gameOptions)

}



const start = () => {

    bot.setMyCommands([
        {command: '/start',description: 'Начальное приветствие'},
        {command: '/info',description: 'Что мы знаем о вас'},
        {command: '/game',description: 'Игра отгадай число!'},
        
    
    
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.jpg')
            return bot.sendMessage(chatId,`Добро пожаловать в нашь бот`)
        }
    
        if(text ==='/info') {
    
            return bot.sendMessage(chatId,`Тебя зовут ${msg.from.first_name} ${msg.from.last_name} Ваш никнейм ${msg.from.username}`)
    
        }

        if(text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId,`Я тебя не понимаю,попробуй еще раз!`)

        
    })

    bot.on('callback_query', async msg => {
     
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again') {

           return startGame(chatId)
        }

        if(data === chats[chatId]) {
            return bot.sendMessage(chatId,`Поздравляю,вы отгадали цифру  ${chats[chatId]}`,againOptions)

        }else{
            return bot.sendMessage(chatId,`Ты не угадал цифру :  ${chats[chatId]}`,againOptions)
            }

    })


}

start()