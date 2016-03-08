import {IStore, IReducer, IMiddleware} from "redux";

/**
 * Action constants
 */
export const LOAD: string;
export const SAVE: string;

/**
 * Storage engine interface
 */
export interface StorageEngine {
    /**
     * Load
     */
    load(): Promise<any>;
    /**
     * Save
     * @param state
     */
    save(state: any): Promise<any>
}

export interface StateMerger {
    (oldState: any, newState: any): any; 
}

/**
 * Storage reducer
 * @param reducer
 * @param merger
 */
export function reducer<TState>(reducer: IReducer<TState>, merger?: StateMerger): IReducer<TState>;

/**
 * Create storage middleware
 * @param engine
 * @param actionBlacklist
 * @param actionWhitelist
 */
export function createMiddleware<TState>(engine: StorageEngine, actionBlacklist?: string[], actionWhitelist?: string[]): IMiddleware<TState>;

/**
 * Loader interface
 */
interface Loader<TState> extends Function {
    (store: IStore<TState>): Promise<any>
}

/**
 * Create state loader
 * @param engine
 */
export function createLoader<TState>(engine: StorageEngine): Loader<TState>;
