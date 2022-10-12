import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typescript-ioc';

import { resolverManager } from './_resolver-manager';
import { FromModel } from '../models';
import { FromService } from '../services';
import { From } from '../schemas';
import { PredictionsModel } from 'src/models/result.model';

@Resolver(of => From)
export class FromResolver {
    @Inject
    service: FromService;

    @Query(returns => [From])
    async From(): Promise<PredictionsModel[]> {
        return this.service.postFrom();
    }
}

resolverManager.registerResolver(FromResolver);
