import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8771876374:AAEagnyI0_DI2WIDZtxZe-nn6hfq6AGO1uI';
const bot = new TelegramBot(BOT_TOKEN);

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  if (!fs.existsSync(dbPath)) return { users: [] };
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDB(data: any) {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Webhook handler
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;
      const username = body.message.from.username;

      if (text === '/start') {
        await bot.sendMessage(chatId,
          `🎓 Привет! Я бот Mentoria Hub!\n\n` +
          `Для привязки аккаунта используй этот код в настройках профиля:\n\n` +
          `🔑 Код: ${chatId}\n\n` +
          `Отправь этот код на платформе для получения уведомлений!`
        );
      } else if (text === '/help') {
        await bot.sendMessage(chatId,
          `📚 Команды бота:\n\n` +
          `/start - Получить код привязки\n` +
          `/help - Помощь\n` +
          `/status - Проверить статус привязки`
        );
      } else if (text === '/status') {
        const db = readDB();
        const user = db.users.find((u: any) => u.telegramChatId === chatId.toString());

        if (user) {
          await bot.sendMessage(chatId, `✅ Аккаунт привязан!\nИмя: ${user.name}`);
        } else {
          await bot.sendMessage(chatId, `❌ Аккаунт не привязан. Используй /start для получения кода.`);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

// Link Telegram account
export async function PUT(request: Request) {
  try {
    const { userId, telegramChatId } = await request.json();

    const db = readDB();
    const userIndex = db.users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    db.users[userIndex].telegramChatId = telegramChatId;
    writeDB(db);

    // Send confirmation to Telegram
    try {
      await bot.sendMessage(telegramChatId,
        `✅ Аккаунт успешно привязан!\n\n` +
        `Теперь ты будешь получать уведомления о:\n` +
        `📚 Новых курсах\n` +
        `🏆 Новых возможностях\n` +
        `📊 Изменениях рейтинга\n` +
        `💬 Сообщениях от менторов`
      );
    } catch (err) {
      console.error('Failed to send confirmation:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Link account error:', error);
    return NextResponse.json({ error: 'Failed to link account' }, { status: 500 });
  }
}

// Send notification
export async function PATCH(request: Request) {
  try {
    const { userId, message, type } = await request.json();

    const db = readDB();
    const user = db.users.find((u: any) => u.id === userId);

    if (!user || !user.telegramChatId) {
      return NextResponse.json({ error: 'User not found or Telegram not linked' }, { status: 404 });
    }

    const emoji = type === 'course' ? '📚' : type === 'opportunity' ? '🏆' : type === 'rank' ? '📊' : '💬';
    await bot.sendMessage(user.telegramChatId, `${emoji} ${message}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send notification error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
