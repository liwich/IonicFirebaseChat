import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);


export const addUserMessages = functions.database.ref(`messages/{messageId}`).onWrite(
    event=>{
        const messageKey= event.data.key;
        const messageValue = event.data.val();

        admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`)
        .child(messageKey)
        .set(1)
        .then(response=>{
            return event.data.key
        }).catch(error=>{
            return event.data.key
        });
        admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`)
        .child(messageKey)
        .set(1)
        .then(response=>{
            return event.data.key
        }).catch(error=>{
            return event.data.key
        });
        
    }
);