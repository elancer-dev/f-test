import { TState } from "../utils/types";

export const getState = (): TState => {
    return {
        points: [
            { coord: [0, 0], name: 'name1' },
            { coord: [1, 1], name: 'name2' },
            { coord: [2, 2], name: 'name3' },
            { coord: [3, 3], name: 'name4' },
        ]
    }
}