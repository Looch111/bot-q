
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const body = req.body;

  const TELEGRAM_BOT_TOKEN = '7573761211:AAEC89yy4AqxzQbZIC0sHxiBNsqoCz6_K0A';
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

  const chat_id = body.message.chat.id;
  const text = body.message.text;
  const message_id = body.message.message_id;

  if (text === '/start') {
    const photoPath = path.join(__dirname, 'home.png');
    const caption = `
👋 *Welcome to the GamaDog Adventure!* 🐾🎮

Get ready for a tail-wagging journey where every paw-tap leads to bigger rewards!

✨ *Play GamaDog*: Tap the dog bone and watch your balance fetch amazing rewards!
🐕 *Mine for PUPS*: Collect GamaDog Tokens with every action.
📋 *Complete Doggy Tasks*: Finish fun missions and earn more treats!
🏆 *Climb the Leaderboard*: Compete with other pups and rise to the top!
👥 *Invite Your Pack & Earn More!*  
Got friends, family, or fellow dog lovers? Invite them to join the fun!

🔗 *Connect with Us:*
- Dev: [@itking007](https://t.me/itking007)
- Join [Dog Lovers Pack](https://t.me/companybrodigital)

🐾 *Start Now* and take your dog on the GamaDog adventure!
👉 [Join Our Doggo Community](https://t.me/companybrodigital)
`;

    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("caption", caption);
    form.append("parse_mode", "Markdown");
    form.append("reply_to_message_id", message_id);
    form.append("reply_markup", JSON.stringify({
      inline_keyboard: [[
        { text: "Play GamaDog Now", web_app: { url: "https://9000-firebase-studio-1750325090866.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev" } },
        { text: "Join Our Community", url: "https://t.me/companybrodigital" }
      ]]
    }));
    form.append("photo", fs.createReadStream(photoPath));

    const response = await fetch(`${TELEGRAM_API}/sendPhoto`, {
      method: "POST",
      body: form,
      headers: form.getHeaders()
    });

    const data = await response.json();
    return res.status(200).json({ ok: true, response: data });
  }

  res.status(200).send("Bot working");
};
