import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private pg: Client,
  ) {}
  getHello() {
    return `Hello ->`;
  }
  task() {
    return 'my tasks'
  //   return new Promise((resolve, reject) => {
  //     this.pg.query('SELECT * FROM tasks', (e, r) => {
  //       if(e){

  //         reject(e);
  //       }
  //       resolve(r.rows);
  //     });
  //   });
  }
}
