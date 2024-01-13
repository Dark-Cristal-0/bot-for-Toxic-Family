const renderMessage = function(obj){
  const membersCouter = `${obj.members.length}/30`
  const dateTime = new Date().getTime()
  const lastFetch = obj.lastFetch
  
  const lastUpdateTime = (dateTime - lastFetch)/1000
  const update =function(lastUpdateTime){
    const hourse = Math.floor(lastUpdateTime/(60*60))
    const mitutes = Math.floor((lastUpdateTime-hourse*60*60)/60)
    const seconds = Math.floor((lastUpdateTime-hourse*60*60 - mitutes*60))
    let text =""
    hourse?text+=`${hourse}h`:null
    mitutes?text+=`${mitutes}m`:null
    seconds?text+=`${seconds}s`:null
    return text
  }
  const message =`
Name: ${obj.name} 💚

Tag: ${obj.tag}
  
Trophies: 🏆${obj.trophies}🏆
  
Invite: 🏆${obj.requiredTrophies}🏆
  
Members: ${membersCouter}👨‍👩‍👧‍👦
  
Tg head: 🔗${obj.tgHead.url}
  
Last update: ${update(lastUpdateTime)}🕰️
  
New update: ${update((lastFetch + 1000*60*60 - dateTime)/1000)}🕰️`
return message
}

module.exports = renderMessage