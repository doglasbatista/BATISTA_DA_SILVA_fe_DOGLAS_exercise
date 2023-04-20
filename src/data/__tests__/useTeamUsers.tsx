import {renderHook, waitFor} from '@testing-library/react';
import {getTeamOverview, getUserData} from 'api';
import {useFetchTeamUsers} from '../useFetchTeamUsers';

jest.mock('api', () => ({
    getTeamOverview: jest.fn(),
    getUserData: jest.fn(),
}));

describe('useFetchTeamUsers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches team lead and team members', async () => {
        (getTeamOverview as jest.Mock).mockResolvedValue({
            teamLeadId: 'lead-id',
            teamMemberIds: ['member-1-id', 'member-2-id'],
        });

        (getUserData as jest.Mock)
            .mockResolvedValueOnce({id: 'lead-id', name: 'Team Lead'})
            .mockResolvedValueOnce({id: 'member-1-id', name: 'Member 1'})
            .mockResolvedValueOnce({id: 'member-2-id', name: 'Member 2'});

        const {result} = renderHook(() => useFetchTeamUsers('test-team'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.pageData.teamLead).toEqual({
            id: 'lead-id',
            name: 'Team Lead',
        });
        expect(result.current.pageData.teamMembers).toEqual([
            {id: 'member-1-id', name: 'Member 1'},
            {id: 'member-2-id', name: 'Member 2'},
        ]);
    });

    it('handles empty team members', async () => {
        (getTeamOverview as jest.Mock).mockResolvedValue({
            teamLeadId: 'lead-id',
            teamMemberIds: [],
        });

        (getUserData as jest.Mock).mockResolvedValueOnce({id: 'lead-id', name: 'Team Lead'});

        const {result} = renderHook(() => useFetchTeamUsers('test-team'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(async () => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.pageData.teamLead).toEqual({id: 'lead-id', name: 'Team Lead'});
        expect(result.current.pageData.teamMembers).toEqual([]);
    });

    it('handles API errors', async () => {
        (getTeamOverview as jest.Mock).mockRejectedValue(new Error('API Error'));

        const {result} = renderHook(() => useFetchTeamUsers('test-team'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(async () => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.pageData.teamLead).toBeUndefined();
        expect(result.current.pageData.teamMembers).toBeUndefined();
    });
});
