export const Helper = {

    getRandom: (min: number, max: number): number => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    isSet: <T>(val: T | undefined | null): val is T => {
        return (typeof val !== 'undefined' && val !== null);
    },

    isFunction: <T>(val: Function | any): val is Function => {
        return (typeof val === 'function');
    },

}

export default Helper;