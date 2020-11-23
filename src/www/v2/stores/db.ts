import { Schema, EmptySchema } from '@common/index';

export const db = {
  state: EmptySchema,
  update(data: Schema) {
    Object.keys(data).forEach((key: string) => {
      this.state[key] = data[key];
    });
    // console.log('Updated', JSON.stringify(data));
  },
};

let __INITIALIZATION_STARTED = false;
export const initOnce = async () => {
  if (__INITIALIZATION_STARTED) return;
  __INITIALIZATION_STARTED = true;

  const resp = await fetch(`db.json?var=${Date.now()}`);
  const data: Schema = await resp.json();
  db.update(data);
};
