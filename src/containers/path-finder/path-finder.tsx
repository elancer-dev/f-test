import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TState, TActionFunction, TPoint, YMapsEvent } from './../../utils/types';
import { action, actionsHandler } from './../../utils/actions';
import { YMaps, Map, YMapsApi } from 'react-yandex-maps';
import PointsList from './../points-list/points-list';
import './path-finder.scss';

const Boundary: React.FC = ({ children }: { children?: React.ReactNode; }) => (<Fragment>{process.env.NODE_ENV === 'test' ? null : children}</Fragment>);

type TProps = {}

type TPS = TProps & {
    points: Array<TPoint>;
    action: TActionFunction;
}

export class PathFinder extends React.PureComponent<TPS> {

    private ymaps: YMapsApi | null = null;
    private map: any = null;
    private route: any = null;
    private balloonLayout: any = null;
    private suggestInput: React.RefObject<HTMLInputElement>;

    constructor(props: TPS) {
        super(props);
        this.suggestInput = React.createRef();
    }

    mapOnLoadHolder = (ymaps: YMapsApi) => {

        this.ymaps = ymaps;

        ymaps.load((ymaps: YMapsApi) => {

            const suggestView = new ymaps.SuggestView("suggest", {
                provider: 'yandex#map',
                results: 10,
            });

            suggestView.events.add('select', (e: YMapsEvent) => {

                if (this.suggestInput.current) {
                    this.suggestInput.current.value = '';
                }

                var item = e.get('item');

                ymaps.geocode(item.value).then((res: any) => {

                    var coord = res.geoObjects.get(0).geometry.getCoordinates();

                    this.props.action(actionsHandler, 'addPoint', { coord: coord, name: item.displayName });

                });

            }, this);

            this.balloonLayout = ymaps.templateLayoutFactory.createClass('<div>{{ properties.address|raw }}</div>');

        });

    }

    routeAppend = () => {

        if (this.ymaps) {

            var multiRoute = new this.ymaps.multiRouter.MultiRoute({ referencePoints: this.props.points.map(point => point.name) },
                {
                    editorMidPointsType: "way",
                    editorDrawOver: false,
                    preventDragUpdate: true,
                    balloonContentLayout: this.balloonLayout,
                    balloonPanelMaxMapArea: 0,
                    boundsAutoApply: true,
                });

            multiRoute.editor.start({
                addWayPoints: false,
                dragWayPoints: true,
                removeWayPoints: false,
                addMidPoints: false,
            });

            if (this.route) {
                this.map.geoObjects.remove(this.route);
            }

            this.route = multiRoute;
            this.map.geoObjects.add(multiRoute);

            multiRoute.model.events.once("requestsuccess", () => {

                var points = multiRoute.getWayPoints();

                for (var i = 0; i < points.getLength(); i++) {

                    var point = points.get(i);

                    if (this.ymaps) {
                        this.ymaps.geoObject.addon.balloon.get(point);
                    }

                    point.options.set({
                        preset: "islands#blueIcon",
                        iconContentLayout: this.ymaps ? this.ymaps.templateLayoutFactory.createClass((i + 1).toString()) : '',
                        balloonContentLayout: this.balloonLayout,
                        balloonOffset: [0, -35],
                        hideIconOnBalloonOpen: false,
                        draggable: true,
                        pointIndex: i,
                    });

                }

            });

            multiRoute.editor.events.add('waypointdragend', (e: any) => {

                var point = e.get('wayPoint');
                var coord = point.geometry.getCoordinates();
                var pointIndex = point.options.get('pointIndex');

                if (this.ymaps) {

                    this.ymaps.geocode(coord, { results: 1 }).then((res: any) => {

                        var properties = res.geoObjects.get(0).properties.getAll();

                        this.props.action(actionsHandler, 'updatePoint', { index: pointIndex, coord: coord, name: properties.text });

                    });
                }

            });

        }

    }

    render = () => {

        this.routeAppend();

        return (

            <div className="path-finder" >
                <div className="path-finder__sidebar">
                    <input type="text" autoFocus={true} id="suggest" className="path-finder__searct-input" ref={this.suggestInput} />
                    <Boundary>
                        <PointsList />
                    </Boundary>
                </div>
                <div className="path-finder__map-container">
                    <Boundary>
                        <YMaps
                            query={{
                                ns: "use-load-option",
                                apikey: "3f58b004-e8ca-4980-bdfb-03221ab45a61",
                                load: "Map"
                            }}>
                            <Map
                                className="path-finder__map"
                                defaultState={{ center: [55.75, 37.57], zoom: 9, }}
                                instanceRef={(map: React.Ref<YMapsApi>) => { this.map = map }}
                                onLoad={this.mapOnLoadHolder} />
                        </YMaps>
                    </Boundary>
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(PathFinder);