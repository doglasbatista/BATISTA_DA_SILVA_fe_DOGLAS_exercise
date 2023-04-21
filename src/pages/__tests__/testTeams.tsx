import * as React from 'react';
import {render} from '@testing-library/react';
import Teams from '../Teams';
import {useFetchTeams} from '../../data/useFetchTeams';
import Header from '../../components/Header';
import List from '../../components/List';
import {mapTeamsToListItems} from '../../utils/teamUtils';

jest.mock('../../data/useFetchTeams');
jest.mock('../../components/Header');
jest.mock('../../components/List');

const HeaderMock = Header as jest.Mock;
const ListMock = List as jest.Mock;

const teamsData = [
    {
        id: 'team-1',
        name: 'Team 1',
    },
    {
        id: 'team-2',
        name: 'Team 2',
    },
];

describe('Teams', () => {
    describe('Header', () => {
        it('renders header with title', () => {
            (useFetchTeams as jest.Mock).mockReturnValue({
                data: teamsData,
                isLoading: false,
            });

            render(<Teams />);

            expect(HeaderMock).toHaveBeenCalledTimes(1);
            expect(HeaderMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Teams',
                    showBackButton: false,
                }),
                {}
            );
        });
    });

    describe('List', () => {
        it('renders teams list', () => {
            (useFetchTeams as jest.Mock).mockReturnValue({
                data: teamsData,
                isLoading: false,
            });

            render(<Teams />);

            expect(ListMock).toHaveBeenCalledTimes(1);
            expect(ListMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: mapTeamsToListItems(teamsData),
                    isLoading: false,
                }),
                {}
            );
        });

        it('renders spinner while loading', () => {
            (useFetchTeams as jest.Mock).mockReturnValue({
                data: null,
                isLoading: true,
            });

            render(<Teams />);

            expect(ListMock).toHaveBeenCalledTimes(1);
            expect(ListMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    items: mapTeamsToListItems(null),
                    isLoading: true,
                }),
                {}
            );
        });
    });
});
