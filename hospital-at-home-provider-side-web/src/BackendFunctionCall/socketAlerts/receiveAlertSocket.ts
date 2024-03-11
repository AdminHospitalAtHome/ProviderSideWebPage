import {WebSocket} from "ws";
import {WebPubSubClient} from '@azure/web-pubsub-client';
import {WebPubSubServiceClient} from "@azure/web-pubsub";

export function pair() {

      let webS = new WebSocket("wss://hospitalathome.webpubsub.azure.com/client/hubs/Hub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3c3M6Ly9ob3NwaXRhbGF0aG9tZS53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0h1YiIsImlhdCI6MTcwOTgyMjgwNiwiZXhwIjoxNzA5ODI2NDA2LCJyb2xlIjpbIndlYnB1YnN1Yi5zZW5kVG9Hcm91cCIsIndlYnB1YnN1Yi5qb2luTGVhdmVHcm91cCJdfQ.IOg35Gim7j7fKWTR4ztN_SaAYQDpzwyOmrBJrphVhCQ");
      webS.on('open', () => console.log('commected'));
}
