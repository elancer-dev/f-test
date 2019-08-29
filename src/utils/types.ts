export type YMapsEvent = {
    get: (name: string) => {
        displayName: string;
        hl: [];
        type: string;
        value: string;
    };
}

export type TPoint = {
    coord: [number, number];
    name: string;
};

export type TState = {
    points: Array<TPoint>;
}

export type TAction<H extends object, D> = {
    handler: H;
    type: keyof H;
    data: D;
}

export type TDataArgumentType<F> = F extends (s: TState, d: infer D) => TState ? D : never;

export type TActionFunction = <H extends object, T extends keyof H>(handler: H, type: T, data: TDataArgumentType<H[T]>) => TAction<H, TDataArgumentType<H[T]>>;