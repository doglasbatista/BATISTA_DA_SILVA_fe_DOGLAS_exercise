import React from 'react';
import {render} from '@testing-library/react';
import Card from 'components/Card';
import {UserData} from 'types';
import TeamLeadCard from '..';

jest.mock('components/Card');

const CardMock = Card as jest.Mock;

const teamLeadData: UserData = {
    id: 'team-lead-1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'johndoe',
    location: 'New York',
    avatar: '',
};

describe('TeamLeadCard', () => {
    it('should render the TeamLeadCard with proper data', () => {
        render(<TeamLeadCard teamLead={teamLeadData} />);

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
                url: '/user/team-lead-1',
                navigationProps: teamLeadData,
            }),
            {}
        );
    });
});
