import React from 'react';
import TestRenderer from 'react-test-renderer';
import { getState } from "./../../lib/test";
import { PathFinder } from './path-finder';

export default describe('<PathFinder />', () => {

    it('Renders PathFinder component', () => {

        const action = jest.fn();
        const state = getState();

        const root = <PathFinder action={action} points={state.points} />;

        const tree = TestRenderer.create(root).toJSON();

        expect(tree).toMatchSnapshot();

    });

});