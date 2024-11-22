const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.https.onCall(async (data, context) => {
  const message = {
    notification: {
      title: data.title,
      body: data.body,
    },
    token: data.token, // Token do dispositivo ou grupo de dispositivos
  };
  try {
    await admin.messaging().send(message);
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    return { success: false, error: error.message };
  }
});
