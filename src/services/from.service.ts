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

    async postFrom(state): Promise<String> {
        console.log("DATO ENVIADO")
        return new Promise((resolve, reject) => {
            var axios = require('axios');
            var data = JSON.stringify({
            "username": "aper",
            "password": "soP73dPaUg"
            });
            
            var config = {
            method: 'post',
            url: 'https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud/icp4d-api/v1/authorize',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };
            
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.token));
                let hour=  Number(state.starttime.split(':')[0])
                console.log(hour);
                console.log("Bearer " + response.data.token)
                var axios = require('axios');
                var data = JSON.stringify({
                "input_data":[{"fields": ["hour","House overall","Solar","temperature","visibility","apparentTemperature","windSpeed","cloudCover","windBearing","precipProbability"],"values": [[hour,0.932833333,0.003483333,36.14,10,29.26,9.18,"cloudCover",282,0]]}]
                });
                console.log(data)
                var config = {
                method: 'post',
                url: 'https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud/ml/v4/deployments/d9a77564-1233-4ddf-bd50-734b728f77e5/predictions?version=2022-10-12',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + response.data.token
                },
                data : data
                };
                axios(config)
                .then(function (response) {
                    console.log("HOLA");
                    console.log(JSON.stringify(response.data));
                    resolve(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                    });
            })
            .catch(function (error) {
            console.log(error);
            });
        }

    )}

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