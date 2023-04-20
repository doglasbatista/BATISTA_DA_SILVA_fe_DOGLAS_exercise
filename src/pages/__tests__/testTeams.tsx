import * as React from 'react';
import {render} from '@testing-library/react';
import Teams, {MapT} from '../Teams';
import {useFetchTeams} from '../../data/useFetchTeams';
import Header from '../../components/Header';
import List from '../../components/List';

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
    beforeEach(() => {
        (useFetchTeams as jest.Mock).mockReturnValue({
            data: teamsData,
            isLoading: false,
        });
    });

    it('renders header with title', () => {
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

    it('renders teams list', () => {
        render(<Teams />);

        expect(ListMock).toHaveBeenCalledTimes(1);
        expect(ListMock).toHaveBeenCalledWith(
            expect.objectContaining({
                items: MapT(teamsData),
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
                items: MapT(null),
                isLoading: true,
            }),
            {}
        );
    });
});
