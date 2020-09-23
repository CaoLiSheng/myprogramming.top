declare var __posts_root__: string;

const __posts_db__ = __posts_root__ + `db.json?var=${Date.now()}`;

export const __dirs__ = { __posts_root__, __posts_db__ };
