import { TState, TAction } from './types';

export const initialState: TState = {
    points: [
        // { coord: [55.753215, 37.622504], name: 'Москва', },
        // { coord: [56.185102, 36.977631], name: 'Солнечногорск', },
        // { coord: [55.991390, 36.484994], name: 'село Новопетровское', },
    ],
}

export function reducer(state: TState = initialState, action: TAction<any, any>): TState {

    if (action.handler !== undefined && typeof action.handler[action.type] === 'function') {
        return action.handler[action.type](state, action.data);
    } else {
        return state;
    }

}