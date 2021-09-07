import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

const { CONSUMER_IP } = process.env;
@Injectable()
export class AppService {
  getHello(): string {
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          console.log(net.address);
          console.log(CONSUMER_IP);
          if (CONSUMER_IP === net.address) {
            results['isConsumer'].push(true);
          }
          results[name].push(net.address);
        }
      }
    }

    return results;
  }
}
