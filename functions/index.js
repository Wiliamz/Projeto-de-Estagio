const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Função para enviar notificação push
exports.sendNotification = functions.https.onCall(async (data) => {
  const {title, body, token} = data;

  const message = {
    topic: "news",
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    await admin.messaging().send(message);
    return {success: true};
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    return {success: false, error: error.message};
  }
});

exports.subscribeToTopic = functions.https.onCall(async (data) => {
  const token = data.token; // Token que você recebeu do frontend
  const topic = data.topic; // Nome do tópico (ex: "news", "sports", etc.)
  console.log("Token recebido:", token); // Log do token
  console.log("Tópico recebido:", topic); // Log do tópico
  if (!token || !topic) {
    return {success: false, error: "Token e Tópico são obrigatórios"};
  }

  // Inscreva o token no tópico
  return admin
      .messaging()
      .subscribeToTopic([token], topic)
      .then((response) => {
        console.log("Token inscrito no tópico:", response);
        return {success: true, message: `Token inscrito no tópico ${topic}`};
      })
      .catch((error) => {
        console.error("Erro ao inscrever no tópico:", error);
        return {success: false, error: error.message};
      });
});
