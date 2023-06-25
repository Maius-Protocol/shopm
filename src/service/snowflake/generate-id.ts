import { Worker } from "snowflake-uuid";
// const { Worker } = require('snowflake-uuid');

const generator = new Worker(0, 1, {
  workerIdBits: 5,
  datacenterIdBits: 5,
  sequenceBits: 12,
});

export const generateId = async () => {
  return generator.nextId().toString();
};
