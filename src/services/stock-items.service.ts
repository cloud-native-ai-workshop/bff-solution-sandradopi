import { Inject } from 'typescript-ioc';
import { get, Response } from 'superagent';

import { StockItemsApi } from './stock-items.api';
import { StockItemModel } from '../models';
import { StockItemServiceConfig } from '../config';
import { LoggerApi } from '../logger';

class StockItem {
    'id'?: string;
    'manufacturer'?: string;
    'picture'?: string;
    'name'?: string;
    'price'?: number;
    'stock'?: number;
}

export class StockItemsService implements StockItemsApi {
    @Inject
    _logger: LoggerApi;
    @Inject
    config: StockItemServiceConfig;

    get logger(): LoggerApi {
        return this._logger.child('StockItemsService');
    }

    async listStockItems(): Promise<StockItemModel[]> {
        return new Promise((resolve, reject) => {
            get(`${this.config.baseUrl}/stock-items`)
                .set('Accept', 'application/json')
                .then(res => {
                    console.error('LOGTAMER', res.body);
                    resolve(this.mapStockItems(res.body));
                })
                .catch(err => {
                    console.error('LOGTAMER', err);
                    reject(err);
                });
        });
    }

    mapStockItems(data: StockItem[]): StockItemModel[] {
        return data.map(this.mapStockItem);
    }

    mapStockItem(item: StockItem): StockItemModel {
        return {
            id: item.id,
            name: item.name,
            stock: item.stock,
            unitPrice: item.price,
            picture: item.picture ?? 'https://via.placeholder.com/32.png',
            manufacturer: item.manufacturer,
        };
    }
}