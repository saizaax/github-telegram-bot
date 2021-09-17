require("dotenv").config({ path: "./.env" })

const axios = require("axios").default
const TelegramBot = require("node-telegram-bot-api")

/** Ваш персональный токен GitHub */
const githubToken = process.env.GITHUB_TOKEN

/** Ваш токен от бота телеграм */
const telegramToken = process.env.TELEGRAM_TOKEN

/** Ваш ID профиля в телеграм */
const telegramId = Number(process.env.TELEGRAM_USER_ID)

const bot = new TelegramBot(telegramToken, { polling: true })

bot.on("message", (msg) => {
  const chatId = msg.chat.id
  const userId = Number(msg.from.id)

  if (msg.text === "/repos" && userId === telegramId) {
    getCurrentUser().then((user) => {
      getRepos(user.login).then((response) => {
        const repos = response.items
          .map((item) => formatRepo(item))
          .join("\n\n")
        bot.sendMessage(chatId, repos, { parse_mode: "HTML" })
      })
    })
  }
})

const formatRepo = (repo) => {
  const { html_url, full_name, private, updated_at, language } = repo

  const URL = `<a href="${html_url}">${full_name}</a>`
  const IS_PRIVATE = private ? "<code>PRIVATE</code>" : "<code>PUBLIC</code>"
  const LAST_UPDATE = `<i>${new Date(updated_at).toLocaleString()}</i>`
  const MAIN_LANGUAGE = `<b>${language}</b>`

  return `${IS_PRIVATE}\n${URL}\n${MAIN_LANGUAGE} • ${LAST_UPDATE}`
}

const getRepos = (user) => {
  return new Promise((resolve, reject) =>
    axios
      .get(`https://api.github.com/search/repositories?q=user:${user}`, {
        headers: { Authorization: `Bearer ${githubToken}` },
      })
      .then((response) => resolve(response.data))
      .catch((e) => reject(e))
  )
}

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((e) => reject(e))
  })
}
