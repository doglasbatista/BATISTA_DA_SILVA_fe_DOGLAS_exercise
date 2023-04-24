import {UserData, ListItem} from 'types';
import {mapUsersToListItems} from '../teamOverviewUtils';

describe('mapArray', () => {
    it('should map UserData array to ListItem array', () => {
        const users: UserData[] = [
            {
                id: 'user-1',
                firstName: 'John',
                lastName: 'Doe',
                displayName: 'johndoe',
                location: 'USA',
                avatar: '',
            },
            {
                id: 'user-2',
                firstName: 'Jane',
                lastName: 'Doe',
                displayName: 'janedoe',
                location: 'UK',
                avatar: '',
            },
        ];

        const expectedListItems: ListItem[] = [
            {
                id: 'user-1',
                url: '/user/user-1',
                columns: [
                    {
                        key: 'Name',
                        value: 'John Doe',
                    },
                    {
                        key: 'Display Name',
                        value: 'johndoe',
                    },
                    {
                        key: 'Location',
                        value: 'USA',
                    },
                ],
                navigationProps: users[0],
            },
            {
                id: 'user-2',
                url: '/user/user-2',
                columns: [
                    {
                        key: 'Name',
                        value: 'Jane Doe',
                    },
                    {
                        key: 'Display Name',
                        value: 'janedoe',
                    },
                    {
                        key: 'Location',
                        value: 'UK',
                    },
                ],
                navigationProps: users[1],
            },
        ];

        const result = mapUsersToListItems(users);
        expect(result).toEqual(expectedListItems);
    });
});
