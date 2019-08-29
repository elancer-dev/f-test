import React, { Component } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { actionsHandler } from "./../../utils/actions";
import { getState } from "./../../lib/test";
import { PointsList } from './points-list';

export default describe('<PointsList />', () => {

    it('Renders PointsList component', () => {

        const action = jest.fn();
        const state = getState();
        const pointsArrayLength = state.points.length;

        const root = <PointsList action={action} points={state.points} />;

        const component = ReactTestUtils.renderIntoDocument<Component>(root);

        const tree = TestRenderer.create(root).toJSON();
        expect(tree).toMatchSnapshot();

        const listItems = ReactTestUtils.scryRenderedDOMComponentsWithClass((component as Component), 'points-list__item-remove');

        ReactTestUtils.Simulate.click(listItems[listItems.length - 1]);

        expect(action).toHaveBeenCalledWith(actionsHandler, 'removePoint', { index: pointsArrayLength - 1 });

    });

});