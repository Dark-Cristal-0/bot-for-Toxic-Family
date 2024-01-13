const bot = require("./bot")
const renderMessage = require("./util/renderMessage")
  
let clubs =bot.brawlStars.get.allClubs()
let infoClubs = []
const getMessageList =function(){

  for(let el of Object.values(clubs)){
    const info =renderMessage(el)
    infoClubs.push(info)
  }
  bot.brawlStars.fetch.allClubs()
  clubs =bot.brawlStars.get.allClubs()

}
  getMessageList()
setInterval(()=>{
  getMessageList()
},1000*60*60)

bot.onText(/\/allClubs/,(msg, math)=>{
  for(let i in infoClubs){
    setTimeout(()=>{
      infoClubs =[]
      for(let el of Object.values(clubs)){
        const info =renderMessage(el)
        infoClubs.push(info)
      }
      bot.sendMessage(msg.chat.id,infoClubs[i])
    },(i+1)*500)
  }
})

let cmdList =[]
let cmdremove =[]
bot.onText(/\/start/,(msg,match)=>{
  let message = "Список команд кланів\n"
  for(let el of cmdList){
    message+=el+"\n"
  }
  bot.sendMessage(msg.chat.id,message)
})

const renderCmd = function(){
  infoClubs =[]
  for(let el of Object.values(clubs)){
    const info =renderMessage(el)
    infoClubs.push(info)
  }
  cmdList =[]
  for(let func of cmdremove){
    func()
  }
  cmdremove=[]
for(let i in clubs){
  const cmd =`/${clubs[i].name.replace(" ","_").replace(" ","_")}`
  cmdList.push(cmd)
  new Promise((resolve, reject) => {
    cmdremove.push(reject)
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
}

renderCmd()
setInterval(()=>{
  renderCmd()
},1000*60*60)



