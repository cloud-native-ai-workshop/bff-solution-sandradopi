import { FromModel } from 'src/models/from.model';
import { PredictionsModel } from 'src/models/result.model';

export abstract class FromApi {
    abstract postFrom(): Promise<String>;
}