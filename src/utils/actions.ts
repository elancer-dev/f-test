import { TState, TAction } from './types';

export const actionsHandler = {

    addPoint: (state: TState, data: { coord: [number, number]; name: string; }): TState => {

        var newState = { ...state };

        newState.points = [...state.points];

        newState.points.push(data);

        return newState;

    },

    updatePoint: (state: TState, data: { index: number; coord: [number, number]; name: string; }): TState => {

        var newState = { ...state };

        newState.points = [...state.points];

        newState.points[data.index].coord = data.coord;
        newState.points[data.index].name = data.name;

        return newState;

    },

    removePoint: (state: TState, data: { index: number }): TState => {

        var newState = { ...state };

        newState.points = [...state.points];

        newState.points.splice(data.index, 1);

        return newState;

    },

    changeOrder: (state: TState, data: { from: number; to: number; }): TState => {

        var newState = { ...state };

        newState.points = [...state.points];

        const item = newState.points.splice(data.from, 1);

        newState.points.splice(data.to, 0, item[0])

        return newState;

    },

}

export const action = <H extends object, T extends keyof H, D>(h: H, t: T, d: D): TAction<H, D> => {
    return { type: t, data: d, handler: h }
}