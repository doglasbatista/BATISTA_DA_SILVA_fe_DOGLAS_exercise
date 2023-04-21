import * as React from 'react';
import {render} from '@testing-library/react';
import {mapUsersToListItems} from 'utils/teamOverviewUtils';
import {TeamUsersState, useFetchTeamUsers} from 'data/useFetchTeamUsers';
import Header from 'components/Header';
import List from 'components/List';
import TeamLeadCard from 'components/TeamLeadCard';
import {UserData} from 'types';
import TeamOverview from '../TeamOverview';

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
jest.mock('data/useFetchTeamUsers');
jest.mock('components/Header');
jest.mock('components/List');
jest.mock('components/TeamLeadCard');

const HeaderMock = Header as jest.Mock;
const ListMock = List as jest.Mock;
const TeamLeadCardMock = TeamLeadCard as jest.Mock;

const teamMembers: UserData[] = [
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
const teamLead: UserData = {
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

    describe('Header', () => {
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
    });

    describe('TeamLeadCard', () => {
        it('renders team lead data', () => {
            render(<TeamOverview />);

            expect(TeamLeadCardMock).toHaveReturnedTimes(1);
            expect(TeamLeadCardMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    teamLead,
                }),
                {}
            );
        });
    });

    describe('List', () => {
        it('renders team members list', () => {
            render(<TeamOverview />);

            expect(ListMock).toHaveBeenCalledTimes(1);
            expect(ListMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: mapUsersToListItems(teamMembers),
                }),
                {}
            );
        });

        it('renders spinner while loading', () => {
            (useFetchTeamUsers as jest.Mock).mockReturnValue({
                pageData: null,
                isLoading: true,
            });

            render(<TeamOverview />);

            expect(ListMock).toHaveBeenCalledTimes(1);
            expect(ListMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: mapUsersToListItems([]),
                    isLoading: true,
                }),
                {}
            );
        });
    });
});
