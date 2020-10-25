import { create as createName } from './name';
import { create as createCustomers } from './customers';
import { create as createNames } from './names';

export const createJobs = [[createName], [createCustomers], [createNames]];
