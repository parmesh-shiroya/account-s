import * as admin from 'firebase-admin'

import * as serviceAccount from '../serviceAccountKey.json'
import { Injectable, InternalServerErrorException } from '@nestjs/common'


const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}
admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: "https://track-corona-8060c.firebaseio.com"
})

@Injectable()
export class FirebaseService {
    async verifyGoogleLoginToken(token) {
        try {
            return await admin.auth().verifyIdToken(token)
        } catch{
            throw new InternalServerErrorException("token is invalid")
        }
    }


    async sendNotification(pincode, title, desc, accountId = "") {
        let message = {
            notification: {
                title: title,
                body: desc,
            },
            data: {
                title: title,
                body: desc,
                accountId: accountId,
                "click_action": "FLUTTER_NOTIFICATION_CLICK",
                triggeredAt: new Date().getTime().toString(),
            },
            condition: `'${pincode}' in topics`
        };
        console.log(message)
        return admin.messaging().send(message).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }
}
