import * as React from 'react';
import {render, waitFor} from '@testing-library/react';
import {useFetchTeams} from 'data/useFetchTeams';
import {useTypeahead} from 'hooks/useTypeahead';
import {useDebounce} from 'hooks/useDebounce';
import Header from 'components/Header';
import List from 'components/List';
import Input from 'components/Input';
import {mapTeamsToListItems} from 'utils/teamUtils';
import Teams, {filteredTeams} from '../Teams';

jest.mock('data/useFetchTeams');
jest.mock('components/Header');
jest.mock('components/List');
jest.mock('components/Input');
jest.mock('hooks/useTypeahead');
jest.mock('hooks/useDebounce');

const HeaderMock = Header as jest.Mock;
const ListMock = List as jest.Mock;
const InputMock = Input as jest.Mock;
const useTypeaheadMock = useTypeahead as jest.Mock;
const useDebounceMock = useDebounce as jest.Mock;

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
        (useDebounce as jest.Mock).mockReturnValue('');
        (useTypeahead as jest.Mock).mockReturnValue({
            searchValue: '',
            handleSearchChange: () => null,
        });
        (useFetchTeams as jest.Mock).mockReturnValue({
            data: teamsData,
            isLoading: false,
        });
    });
    describe('Header', () => {
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
    });

    describe('useTypeahead', () => {
        it('calls useTypeahead hook', () => {
            render(<Teams />);

            expect(useTypeaheadMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('useDebounce', () => {
        it('calls useDebounce with expected values', () => {
            (useTypeahead as jest.Mock).mockReturnValue({
                searchValue: 'gold',
                handleSearchChange: () => null,
            });

            render(<Teams />);

            expect(useDebounceMock).toHaveBeenCalledTimes(1);
            expect(useDebounceMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    value: 'gold',
                })
            );
        });
    });

    describe('Search Input', () => {
        it('renders search input when not loading', () => {
            render(<Teams />);

            expect(InputMock).toHaveBeenCalledTimes(1);
            expect(InputMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'text',
                    placeholder: 'Search teams...',
                    onChange: expect.any(Function),
                    value: '',
                }),
                {}
            );
        });
    });

    describe('List', () => {
        it('renders teams list', () => {
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

        it('filters teams based on search input', async () => {
            (useDebounce as jest.Mock).mockReturnValue('gold');

            render(<Teams />);

            await waitFor(() => {
                expect(ListMock).toHaveBeenCalledWith(
                    expect.objectContaining({
                        items: filteredTeams(teamsData, 'gold'),
                        isLoading: false,
                    }),
                    {}
                );
            });
        });
    });
});
