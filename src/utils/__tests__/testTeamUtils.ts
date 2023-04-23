import {Team} from 'types';
import {mapTeamsToListItems} from '../teamUtils';

describe('teamUtils', () => {
    describe('mapTeamsToListItems', () => {
        it('should correctly map teams to list items', () => {
            const teams: Team[] = [
                {
                    id: '1',
                    name: 'Team 1',
                },
                {
                    id: '2',
                    name: 'Team 2',
                },
            ];

            const expectedResult = [
                {
                    id: '1',
                    url: '/team/1',
                    columns: [{key: 'Name', value: 'Team 1'}],
                    navigationProps: {
                        id: '1',
                        name: 'Team 1',
                    },
                },
                {
                    id: '2',
                    url: '/team/2',
                    columns: [{key: 'Name', value: 'Team 2'}],
                    navigationProps: {
                        id: '2',
                        name: 'Team 2',
                    },
                },
            ];

            expect(mapTeamsToListItems(teams)).toEqual(expectedResult);
        });

        it('should return an empty array if the teams array is empty', () => {
            expect(mapTeamsToListItems([])).toEqual([]);
        });
    });
});
