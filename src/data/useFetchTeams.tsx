import {useReducer, useEffect, useRef} from 'react';
import {Team} from 'types';
import {getTeams} from 'api';

type State = {
    data: Team[] | null;
    isLoading: boolean;
    error: string | null;
};

type Action =
    | {type: 'FETCH_INIT'}
    | {type: 'FETCH_SUCCESS'; payload: Team[]}
    | {type: 'FETCH_FAILURE'; payload: string};

const dataFetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {...state, isLoading: true, error: null};
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: null,
            };
        case 'FETCH_FAILURE':
            return {...state, isLoading: false, error: action.payload};
        default:
            throw new Error('Invalid action type');
    }
};

export const useFetchTeams = () => {
    const isMounted = useRef(false);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        isMounted.current = true;

        const fetchTeamsData = async () => {
            dispatch({type: 'FETCH_INIT'});

            try {
                const teams = await getTeams();
                if (isMounted.current) {
                    dispatch({type: 'FETCH_SUCCESS', payload: teams});
                }
            } catch (error) {
                if (isMounted.current) {
                    dispatch({type: 'FETCH_FAILURE', payload: error.message});
                }
            }
        };

        fetchTeamsData();

        return () => {
            isMounted.current = false;
        };
    }, []);

    return state;
};
