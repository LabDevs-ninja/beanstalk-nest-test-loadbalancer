import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

@Injectable()
export class AppService {
  getHello(): string {
    const { CONSUMER_IP } = process.env;
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object
    let isConsumer = false;
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          if (CONSUMER_IP === net.address) {
            isConsumer = true;
          }
          results[name].push(net.address);
        }
      }
    }
    console.log(CONSUMER_IP);
    results['consumerIP'] = CONSUMER_IP;
    results['isConsumer'] = isConsumer;
    results['version'] = 'v1.1.2';
    return results;
  }
}
