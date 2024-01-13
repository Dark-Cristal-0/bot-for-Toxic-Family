const bot = require("./bot")
const admin = require("./admin/index")
const clanList = require("./admin/function/clanList")
bot.brawlStars.fetch.allClubs()
const clubs =bot.brawlStars.get.allClubs()
const infoClubs = []
for(let el of Object.values(clubs)){
  const membersCouter =`${el.members.length}/30`
  const info =`
Name: ${el.name} 💚

Tag: ${el.tag}

Trophies: 🏆${el.trophies}🏆

Invite: 🏆${el.requiredTrophies}🏆

Members: ${membersCouter}👨‍👩‍👧‍👦

Tg head: 🔗${el.tgHead.url}

Last update: 20m 42s🕰️

New update: 39m 18s🕰️
`
  infoClubs.push(info)
}
bot.onText(/\/allClubs/,(msg, math)=>{
  for(let i in infoClubs){
    setTimeout(()=>{
      bot.sendMessage(msg.chat.id,infoClubs[i])
    },(i+1)*500)
  }
})
const cmdList =[]

bot.onText(/\/start/,(msg,match)=>{
  let message = "Список команд кланів\n"
  for(let el of cmdList){
    message+=el+"\n"
  }
  bot.sendMessage(msg.chat.id,message)
})

for(let i in clubs){
  const cmd =`/${clubs[i].name.replace(" ","_").replace(" ","_")}`
  cmdList.push(cmd)
  new Promise((resolve, reject) => {
    const _cmd = cmd
    const reg = new RegExp(_cmd)
    bot.onText(reg,(msg,match)=>{
      if(!cmdList.includes(cmd)){
        reject()
      }
      const message = infoClubs[cmdList.indexOf(_cmd)]
      bot.sendMessage(msg.chat.id,message)

    })
  })
}
console.log(cmdList)



