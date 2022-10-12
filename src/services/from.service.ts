import { Inject } from 'typescript-ioc';
import {post, Response } from 'superagent';

import { FromApi } from './from.api';
import { LoggerApi } from '../logger';
import { FromServiceConfig } from '../config';
import { FromModel } from 'src/models/from.model';
import { PredictionsModel } from 'src/models/result.model';

class From {
    'id'?: string;
    'electricalapliance'?: string;
    'date'?: string;
    'starttime'?: string;
    'endtime'?: string;
}

export class FromService implements FromApi {
    @Inject
    _logger: LoggerApi;
    @Inject
    config: FromServiceConfig;

    get logger(): LoggerApi {
        return this._logger.child('FromService');
    }

    async postFrom(): Promise<PredictionsModel[]> {
        console.log("SERVER JAVA")
        return new Promise((resolve, reject) => {
            var curlTest = require('node-libcurl').Curl;
            const querystring = require("querystring");
            const { Curl } = require("node-libcurl");
            const terminate = curlTest.close.bind(curlTest);

            curlTest.setOpt(Curl.option.URL, "https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud/icp4d-api/v1/authorize");
            curlTest.setOpt(Curl.option.POST, true);
            curlTest.setOpt(
                Curl.option.POSTFIELDS,
                querystring.stringify({
                    username: "aper",
                    password: "soP73dPaUg",
                })
            );

            curlTest.on("end", function (statusCode, data, headers) {
                console.info("Status code " + statusCode);
                console.info("***");
                console.info("Our response: " + data);
                console.info("***");
                console.info("Length: " + data.length);
                console.info("***");
                console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

                this.close();
                resolve(data);
            });
            curlTest.on("error", terminate);

            curlTest.perform();
           
         
        });
    }

    mapFroms(data: From[]): FromModel[] {
        return data.map(this.mapFrom);
    }

    mapFrom(item:From):FromModel {
        return {
            id: item.id,
            electricalapliance: item.electricalapliance,
            date: item.date,
            starttime: item.starttime,
            endtime: item.endtime,
        };
    }
}