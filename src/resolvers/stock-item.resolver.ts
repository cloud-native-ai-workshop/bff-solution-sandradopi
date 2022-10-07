import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typescript-ioc';

import { resolverManager } from './_resolver-manager';
import { StockItem } from '../schemas';
import { StockItemModel } from '../models';
import { StockItemsService } from '../services';

@Resolver(of => StockItem)
export class StockItemResolver {
    @Inject
    service: StockItemsService;

    @Query(returns => [StockItem])
    async stockItems(): Promise<StockItemModel[]> {
        return this.service.listStockItems();
    }
}

resolverManager.registerResolver(StockItemResolver);
