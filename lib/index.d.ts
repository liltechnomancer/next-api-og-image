import type { NextApiRequest, NextApiResponse } from 'next';
import type { RequireExactlyOne } from 'type-fest';
import type { ReactElement } from 'react';
declare const STRATEGY_OPTIONS: readonly ["body", "query"];
declare type StrategyOption = typeof STRATEGY_OPTIONS[number];
declare type StrategyAwareParams<T extends StrategyOption = 'query', StrategyDetails extends string | object = string> = T extends 'body' ? StrategyDetails : Record<StrategyDetails extends string ? StrategyDetails : string, NonNullable<string>>;
export declare type NextApiOgImageConfig<Strategy extends StrategyOption, StrategyDetails extends string | object = string> = {
    template: RequireExactlyOne<Partial<{
        html: (params: StrategyAwareParams<Strategy, StrategyDetails>) => string | Promise<string>;
        react: (params: StrategyAwareParams<Strategy, StrategyDetails>) => ReactElement | Promise<ReactElement>;
    }>, 'html' | 'react'>;
    strategy?: StrategyOption;
    contentType?: string;
    cacheControl?: string;
    dev?: Partial<{
        inspectHtml: boolean;
        errorsInResponse: boolean;
    }>;
};
export declare function withOGImage<Strategy extends StrategyOption = 'query', StrategyDetails extends string | object = string>(options: NextApiOgImageConfig<Strategy, StrategyDetails>): (request: NextApiRequest, response: NextApiResponse) => Promise<void>;
export {};
