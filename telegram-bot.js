const TelegramBot = require('node-telegram-bot-api');

// Bot token - можно заменить на свой
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7895508137:AAHlpRxdlGzT3AiMNVnGlBIppVk-aJDLV7c';

// Create bot
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 Mentoria Hub Bot запущен!');

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name;

  bot.sendMessage(chatId,
    `🎓 Привет, ${username}! Я бот Mentoria Hub!\n\n` +
    `Для привязки аккаунта используй этот код в настройках профиля:\n\n` +
    `🔑 Твой код: ${chatId}\n\n` +
    `📱 Зайди на платформу → Дашборд → "Настроить Telegram"\n` +
    `Вставь этот код и получай уведомления!\n\n` +
    `Используй /help для списка команд.`
  );
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `📚 Доступные команды:\n\n` +
    `/start - Получить код привязки\n` +
    `/help - Список команд\n` +
    `/status - Проверить статус привязки\n` +
    `/info - Информация о боте`
  );
});

// /status command
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `📊 Проверка статуса...\n\n` +
    `Твой ID: ${chatId}\n\n` +
    `Если ты привязал аккаунт на платформе, ты будешь получать уведомления о:\n` +
    `📚 Новых курсах\n` +
    `🏆 Новых возможностях\n` +
    `📊 Изменениях рейтинга\n` +
    `💬 Сообщениях от менторов`
  );
});

// /info command
bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `ℹ️ Mentoria Hub Bot\n\n` +
    `Официальный бот платформы Mentoria Hub - твоего помощника в образовании!\n\n` +
    `🌐 Платформа: mentoria-hub-hazel.vercel.app\n` +
    `📧 Поддержка: ulagatnurtas10@gmail.com\n\n` +
    `Привязывай аккаунт и получай уведомления в реальном времени! 🚀`
  );
});

// Handle any message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Skip if it's a command
  if (text && text.startsWith('/')) return;

  // Respond to regular messages
  if (text) {
    bot.sendMessage(chatId,
      `Я пока понимаю только команды! 😊\n\n` +
      `Используй /help чтобы увидеть список доступных команд.`
    );
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});
