import { FromModel } from 'src/models/from.model';

export abstract class FromApi {
    abstract postFrom(): Promise<FromModel[]>;
}