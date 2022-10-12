import { FromModel } from 'src/models/from.model';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { StockItemModel } from '../models';

@ObjectType()
export class From implements FromModel {
    @Field()
    id: string;
    @Field()
    electricalapliance: string;
    @Field()
    date: string;
    @Field()
    starttime: string;
    @Field()
    endtime: string;

}