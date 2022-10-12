import { Query, Resolver } from 'type-graphql';
import { Inject } from 'typescript-ioc';

import { resolverManager } from './_resolver-manager';
import { FromModel } from 'src/models/from.model';
import { From } from 'src/schemas/from.schema';
import { FromService } from '../services';

@Resolver(of => From)
export class FromResolver {
    @Inject
    service: FromService;

    @Query(returns => [From])
    async From(): Promise<FromModel[]> {
        return this.service.postFrom();
    }
}

resolverManager.registerResolver(FromResolver);
