import { StockItemServiceConfig } from './stock-item-service.config';
import { stockItemConfigFactory } from './stock-item-service.config.provider';
import { FromServiceConfig } from './fromservice.config';
import { FromConfigFactory } from './fromservice.config.provider';
import { Container } from 'typescript-ioc';

export * from './stock-item-service.config';
export * from './fromservice.config';
Container.bind(StockItemServiceConfig).factory(stockItemConfigFactory);
Container.bind(FromServiceConfig).factory(FromConfigFactory);