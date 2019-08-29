import { actionsHandler } from "./actions";
// import { TState } from "./types";
import { getState } from "./../lib/test";

export default describe('action hendler functions', () => {

    it('addPoint', () => {

        var state = getState();
        var newPointIndex = state.points.length;
        var newPointsArrayLength = state.points.length + 1;

        var newState = actionsHandler.addPoint(state, { coord: [10, 11], name: 'newname' });

        expect(newState.points.length).toBe(newPointsArrayLength);
        expect(newState.points[newPointIndex].coord[0]).toBe(10);
        expect(newState.points[newPointIndex].coord[1]).toBe(11);
        expect(newState.points[newPointIndex].name).toBe('newname');

    });

    it('updatePoint', () => {

        var state = getState();

        var updatePointIndex = 3;
        var newPointsArrayLength = state.points.length;

        var newState = actionsHandler.updatePoint(state, { index: updatePointIndex, coord: [10, 11], name: 'newname' });

        expect(newState.points[updatePointIndex].name).toBe('newname');
        expect(newState.points[updatePointIndex].coord[0]).toBe(10);
        expect(newState.points[updatePointIndex].coord[1]).toBe(11);
        expect(newState.points.length).toBe(newPointsArrayLength);

    });

    it('removePoint', () => {

        var state = getState();

        var removePointIndex = 2;
        var newPointsArrayLength = state.points.length - 1;
        var prevPointName = state.points[removePointIndex - 1].name;
        var nextPointName = state.points[removePointIndex + 1].name;

        var newState = actionsHandler.removePoint(state, { index: removePointIndex });

        expect(newState.points[removePointIndex - 1].name).toBe(prevPointName);
        expect(newState.points[removePointIndex].name).toBe(nextPointName);
        expect(newState.points.length).toBe(newPointsArrayLength);

    });


    it('changeOrder', () => {

        var state = getState();
        var newPointsArrayLength = state.points.length;
        var fromPointIndex = 2;
        var fromPointName = state.points[fromPointIndex].name;
        var toPointIndex = 3
        var toPointName = state.points[toPointIndex].name;

        var newState = actionsHandler.changeOrder(state, { from: fromPointIndex, to: toPointIndex });

        expect(newState.points[fromPointIndex].name).toBe(toPointName);
        expect(newState.points[toPointIndex].name).toBe(fromPointName);
        expect(newState.points.length).toBe(newPointsArrayLength);

    });

}); 