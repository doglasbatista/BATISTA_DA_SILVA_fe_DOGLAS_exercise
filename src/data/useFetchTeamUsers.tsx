import {useEffect, useReducer} from 'react';
import {UserData} from 'types';
import {getTeamOverview, getUserData} from 'api';

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export interface TeamUsersState {
    pageData: PageState;
    isLoading: boolean;
    error: boolean;
}

type Action =
    | {type: 'SET_PAGE_DATA'; payload: PageState }
    | {type: 'SET_LOADING'; payload: boolean }
    | {type: 'SET_ERROR'; payload: boolean };

const initialState: TeamUsersState = {
    pageData: {},
    isLoading: true,
    error: false,
};

function reducer(state: TeamUsersState, action: Action): TeamUsersState {
    switch (action.type) {
        case 'SET_PAGE_DATA':
            return {...state, pageData: action.payload};
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        default:
            return state;
    }
}

export const useFetchTeamUsers = (teamId: string): TeamUsersState => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await
                    getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);

                const teamMembers = [];
                for (const teamMemberId of teamMemberIds) {
                    const data = await getUserData(teamMemberId);
                    teamMembers.push(data);
                }

                dispatch({
                    type: 'SET_PAGE_DATA',
                    payload: {teamLead, teamMembers,
                }});
                dispatch({type: 'SET_LOADING', payload: false});
            } catch (err) {
                dispatch({type: 'SET_ERROR', payload: true});
                dispatch({type: 'SET_LOADING', payload: false});
            }
        };

        getTeamUsers();
    }, [teamId]);

    return state;
};
