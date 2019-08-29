import React, { DragEvent } from 'react';
import { TPoint } from '../../utils/types';
import './points-list-view.scss';

type TProps = {
    points: Array<TPoint>;
    offset: number;
    dragStart: (e: DragEvent<HTMLDivElement>) => void;
    dragOver: (e: DragEvent<HTMLDivElement>) => void;
    dragEnd: (e: DragEvent<HTMLDivElement>) => void;
    removeItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const PointsListView = (props: TProps) => {
    return (
        <div className="points-list">
            {props.points.map((point, index) =>
                <div
                    key={index}
                    className="points-list__item"
                    draggable={true}
                    onDragStart={props.dragStart}
                    onDragOver={props.dragOver}
                    onDragEnd={props.dragEnd}
                    style={{ order: index + props.offset }}
                    data-order={index}
                >
                    <div className="points-list__item-index">{index + 1}</div>
                    <div className="points-list__item-name">{point.name}</div>
                    <div className="points-list__item-remove" onClick={props.removeItem}>x</div>
                </div>
            )}
        </div>
    )
}

export default PointsListView;