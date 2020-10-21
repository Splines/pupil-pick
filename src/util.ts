// We use the keyword "export" here,
// so that we can import this function and use it
// in src/server.ts

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}