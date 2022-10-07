import { Inject } from 'typescript-ioc';
import { GET, Path } from 'typescript-rest';
import { HttpError } from 'typescript-rest/dist/server/model/errors';

import { StockItemModel } from '../models';
import { StockItemsService } from '../services';

class BadGateway extends HttpError {
  constructor(message?: string) {
    super("BadGateway", message);
    this.statusCode = 502;
  }
}

@Path('stock-items')
export class StockItemsController {
  @Inject
  service: StockItemsService;

  @GET
  async listStockItems(): Promise<StockItemModel[]> {
    try {
      return await this.service.listStockItems();
    } catch (err) {
      throw new BadGateway('There was an error');
    }
  }
}