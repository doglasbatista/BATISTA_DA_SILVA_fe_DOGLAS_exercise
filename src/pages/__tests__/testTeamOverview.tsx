import * as React from 'react';
import {render} from '@testing-library/react';
import {TeamUsersState, useFetchTeamUsers} from '../../data/useFetchTeamUsers';
import TeamOverview, {mapArray} from '../TeamOverview';
import Header from '../../components/Header';
import List from '../../components/List';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));
jest.mock('../../data/useFetchTeamUsers');
jest.mock('../../components/Header');
jest.mock('../../components/List');

const HeaderMock = Header as jest.Mock;
const ListMock = List as jest.Mock;

const teamMembers = [
    {
        id: '2',
        firstName: 'user',
        lastName: 'two',
        displayName: 'user-two',
        location: '',
        avatar: '',
    },
    {
        id: '3',
        firstName: 'user',
        lastName: 'three',
        displayName: 'user-three',
        location: '',
        avatar: '',
    },
];
const teamLead = {
    id: '1',
    firstName: 'user',
    lastName: 'one',
    displayName: 'user-one',
    location: '',
    avatar: '',
};

describe('TeamOverview', () => {
    beforeEach(() => {
        const mockData: TeamUsersState = {
            pageData: {
                teamMembers,
                teamLead,
            },
            error: false,
            isLoading: false,
        };

        (useFetchTeamUsers as jest.Mock).mockReturnValue(mockData);
    });

    it('renders header with team name', () => {
        render(<TeamOverview />);

        expect(HeaderMock).toHaveBeenCalledTimes(1);
        expect(HeaderMock).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Team Some Team',
            }),
            {}
        );
    });

    // TODO: i'll need to extract the team lead logic into a new component
    it.todo('renders team lead data');

    it('renders team members list', () => {
        render(<TeamOverview />);

        expect(ListMock).toHaveBeenCalledTimes(1);
        expect(ListMock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: mapArray(teamMembers),
            }),
            {}
        );
    });

    it('renders spinner while loading', () => {
        (useFetchTeamUsers as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
        });

        render(<TeamOverview />);

        expect(ListMock).toHaveBeenCalledTimes(1);
        expect(ListMock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: mapArray([]),
                isLoading: true,
            }),
            {}
        );
    });
});
