### Telegram бот для взаимодействия с API GitHub

Инструкция по запуску:

1. `git clone https://github.com/xaazias/github-telegram-bot`
2. `cd github-telegram-bot`

3. Создайте `.env` файл со следующим содержимым:

```
TELEGRAM_TOKEN=EXAMPLE
GITHUB_TOKEN=EXAMPLE
TELEGRAM_USER_ID=EXAMPLE
```
`TELEGRAM_TOKEN - Ваш токен от бота телеграм`
`GITHUB_TOKEN - Ваш персональный токен GitHub`
`TELEGRAM_USER_ID - Ваш ID профиля в телеграм`

3. `npm install`
4. `npm start`

У бота доступна команда `/repos` возвращающая список ваших публичных и приватных репозиториев на **GitHub**