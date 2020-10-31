import { Schema, EmptySchema } from '@common/index';

export const db = {
  state: EmptySchema,
  update(data: Schema) {
    Object.keys(data).forEach((key: string) => {
      this.state[key] = data[key];
    });
    console.log('Updated', JSON.stringify(data));
  },
};
