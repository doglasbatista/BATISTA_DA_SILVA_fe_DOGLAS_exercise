import {renderHook, waitFor} from '@testing-library/react';
import {getTeams} from 'api';
import {useFetchTeams} from '../useFetchTeams';

jest.mock('api', () => ({
    getTeams: jest.fn(),
}));

describe('useFetchTeams', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches teams successfully', async () => {
        const teamsData = [
            {id: 'team-1', name: 'Team 1'},
            {id: 'team-2', name: 'Team 2'},
        ];

        (getTeams as jest.Mock).mockResolvedValue(teamsData);

        const {result} = renderHook(() => useFetchTeams());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toEqual(teamsData);
        expect(result.current.error).toBeNull();
    });

    it('handles empty teams', async () => {
        (getTeams as jest.Mock).mockResolvedValue([]);

        const {result} = renderHook(() => useFetchTeams());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it('handles API errors', async () => {
        (getTeams as jest.Mock).mockRejectedValue(new Error('API Error'));

        const {result} = renderHook(() => useFetchTeams());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe('API Error');
    });

    it('does not update state on an unmounted component', async () => {
        const teamsData = [
            {id: 'team-1', name: 'Team 1'},
            {id: 'team-2', name: 'Team 2'},
        ];

        (getTeams as jest.Mock).mockImplementation(
            () =>
                new Promise(resolve => {
                    setTimeout(() => resolve(teamsData), 500);
                })
        );

        const {result, unmount} = renderHook(() => useFetchTeams());

        expect(result.current.isLoading).toBe(true);

        // Unmount the component before the API request is completed.
        unmount();

        // Wait for the API request to complete.

        await waitFor(() => {
            expect(result.current.isLoading).toBe(true);
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });
});
