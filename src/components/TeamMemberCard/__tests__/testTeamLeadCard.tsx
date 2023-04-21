import React from 'react';
import {render} from '@testing-library/react';
import Card from 'components/Card';
import {UserData} from 'types';
import TeamMemberCard from '..';

jest.mock('components/Card');

const CardMock = Card as jest.Mock;

const memberData: UserData = {
    id: 'member-1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'johndoe',
    location: 'New York',
    avatar: '',
};

describe('TeamMemberCard', () => {
    it('should render the TeamMemberCard with team lead data', () => {
        render(<TeamMemberCard memberData={memberData} isLead />);

        expect(CardMock).toHaveBeenCalledTimes(1);
        expect(CardMock).toHaveBeenCalledWith(
            expect.objectContaining({
                columns: [
                    {
                        key: 'Team Lead',
                        value: '',
                    },
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
                        value: 'New York',
                    },
                ],
                url: '/user/member-1',
                hasNavigation: true,
                navigationProps: memberData,
            }),
            {}
        );
    });

    it('should render the TeamMemberCard with member data', () => {
        render(<TeamMemberCard memberData={memberData} />);

        expect(CardMock).toHaveBeenCalledTimes(1);
        expect(CardMock).toHaveBeenCalledWith(
            expect.objectContaining({
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
                        value: 'New York',
                    },
                ],
                url: '/user/member-1',
                hasNavigation: true,
                navigationProps: memberData,
            }),
            {}
        );
    });

    it('should render the TeamMemberCard without navigation', () => {
        render(<TeamMemberCard memberData={memberData} hasNavigation={false} />);

        expect(CardMock).toHaveBeenCalledTimes(1);
        expect(CardMock).toHaveBeenCalledWith(
            expect.objectContaining({
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
                        value: 'New York',
                    },
                ],
                url: '/user/member-1',
                hasNavigation: false,
                navigationProps: memberData,
            }),
            {}
        );
    });
});
