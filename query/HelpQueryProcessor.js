module.exports = {
  getHelp: async() => {
    return `
Bot's command list:
> **/list**
list all heroes name added to the bot

> **/bond <hero>**
get the atk/def bond from the hero

> **/faction <hero>**
get the faction of the hero

> **/build <hero>**
get the preferred build of the hero. Wet Ham picture means no build added to the bot yet
    `;
  },
  getAdminHelp: async() => {
    return `
Bot's management command list:
> **/addunit <name>, <atk bond>, <def bond>**
add new hero to the bot. If the hero doesn't require someone else to unlock their bond, just put '-' for it

> **/addnickname <hero>, <nickname>**
add nickname for a hero

> **/getnickname <hero>**
get nicknames assigned to a hero

> **/updatebuild <hero>, <image link>**
add a build for a hero. Upload the image to imgur or wherever that can be accessed publicly first and put the image link there
    `;
  }
}