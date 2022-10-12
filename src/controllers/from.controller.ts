import { FromModel } from 'src/models/from.model';
import { FromService } from '../services';
import { Inject } from 'typescript-ioc';
import { POST, Path } from 'typescript-rest';
import { HttpError } from 'typescript-rest/dist/server/model/errors';
import { PredictionsModel } from 'src/models/result.model';


class BadGateway extends HttpError {
  constructor(message?: string) {
    super("BadGateway", message);
    this.statusCode = 502;
  }
}

@Path('from_prediction')
export class FromController {
  @Inject
  service: FromService;

  @POST
  async postFrom(): Promise<PredictionsModel[]> {
    console.log("SERVER BFF")
    try {
      return await this.service.postFrom();
    } catch (err) {
      throw new BadGateway('There was an error');
    }
  }
}