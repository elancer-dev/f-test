import React, { DragEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TState, TActionFunction, TPoint } from '../../utils/types';
import { action, actionsHandler } from './../../utils/actions';
import PointsListView from './../../components/points-list-view/points-list-view';

type TProps = {}

type TPS = TProps & {
    points: Array<TPoint>;
    action: TActionFunction;
}

export class PointsList extends React.PureComponent<TPS> {

    private currentItem: any = null;
    private offset = 0;

    dragStart = (e: DragEvent<HTMLDivElement>) => {

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData('text/html', 'data');
        this.currentItem = e.currentTarget;

    }

    dragOver = (e: DragEvent<HTMLDivElement>) => {

        var order = this.currentItem.style.order;
        this.currentItem.style.order = e.currentTarget.style.order;
        e.currentTarget.style.order = order;

    }

    dragEnd = (e: DragEvent<HTMLDivElement>) => {

        var from = parseInt(this.currentItem.getAttribute('data-order') + '');
        var to = parseInt(this.currentItem.style.order + '') - this.offset

        this.props.action(actionsHandler, 'changeOrder', { from, to });

        this.currentItem = null;

    }

    removeItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (e.currentTarget.parentElement) {
            var index = parseInt(e.currentTarget.parentElement.getAttribute('data-order') + '');
            this.props.action(actionsHandler, 'removePoint', { index });
        }

    }

    render = () => {

        this.offset += this.props.points.length;

        return (
            <PointsListView points={this.props.points} offset={this.offset} dragStart={this.dragStart} dragOver={this.dragOver} dragEnd={this.dragEnd} removeItem={this.removeItem} />
        )

    }

}

const mapStateToProps = (state: TState) => {

    return {
        points: state.points,
    };

};

const mapDispatchToProps = (dispatch: Dispatch) => {

    return bindActionCreators({ action: action }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(PointsList);