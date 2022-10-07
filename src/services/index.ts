import { Container } from "typescript-ioc";

export * from './hello-world.api';
export * from './project.api';
export * from './task.api';
export * from './stock-items.api';
export * from './stock-items-mock.service';
export * from './stock-items.service';

import config from './ioc.config';

Container.configure(...config);
