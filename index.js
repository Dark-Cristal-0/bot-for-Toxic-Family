const bot = require("./bot")
const renderMessage = require("./util/renderMessage")

  bot.brawlStars.fetch.allClubs()


const clubObj ={
  clubs:[],
  arrPromise:[
    {comand:"",teg:"",dev:()=>{console.log("good create cmd")}}
  ],
  message:["",""],
  updateMessage:()=>{
    clubObj.message = []
    for(let el of clubObj.clubs){
      clubObj.message.push(renderMessage(el))
    }
  },
  updateClubs:()=>{
    clubObj.clubs=[]
    const _clubs = bot.brawlStars.get.allClubs()
    for(let el of Object.values(_clubs)){
      clubObj.clubs.push(el)
    }
  },
  updateArrPromise:()=>{
    for(let el of clubObj.arrPromise){
      el.dev()
    }
    clubObj.arrPromise =[]
    clubObj.updateClubs()
    const clubs = clubObj.clubs
    for(let _i in clubs){
      new Promise((resolve, reject)=>{
        try{
        let i = _i
        const textCmd = "/"+clubs[i].name.replace(" ","_")
        const reg = new RegExp(textCmd)
        console.log(textCmd)
        const tag = clubs[i].tag
        clubObj.arrPromise.push({comand:textCmd,dev:reject,tag:clubs[i].tag})

        bot.onText(reg,(msg,match)=>{
          const obj= clubObj.clubs.filter(el=>el.tag === tag)[0]
          console.log(obj)
          
          const message = renderMessage(obj)
          console.log(message)
          bot.sendMessage(msg.chat.id,message)
        })
        }catch(err){
          console.log(err)
        }
      })
      
    }
  }


}
clubObj.updateClubs()

setInterval(()=>{
  bot.brawlStars.fetch.allClubs()
  clubObj.updateClubs()
},1000*60*60)

clubObj.updateArrPromise()


bot.onText(/\/js ?(.*)/sg,(msg, match)=>{
  if(msg.chat.id =1121847657){
    const [fullMsg,lastMsg,index,inpute,group] =match
    console.log(msg.chat.id)
    const print=(text)=>{
      bot.sendMessage(msg.chat.id,text)
    }
    eval(lastMsg)
  }
})



