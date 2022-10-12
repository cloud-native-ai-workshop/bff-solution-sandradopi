import { FromModel } from 'src/models/from.model';
import { Field,  ObjectType } from 'type-graphql';

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