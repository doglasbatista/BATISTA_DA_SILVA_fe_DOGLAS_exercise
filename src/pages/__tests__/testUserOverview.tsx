import React from 'react';
import {render} from '@testing-library/react';
import {useLocation} from 'react-router-dom';
import Header from 'components/Header';
import TeamMemberCard from 'components/TeamMemberCard';
import UserOverview from '../UserOverview';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
}));

jest.mock('components/Header');
jest.mock('components/TeamMemberCard');

const HeaderMock = Header as jest.Mock;
const TeamMemberCardMock = TeamMemberCard as jest.Mock;

const userData = {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'johndoe',
    location: 'New York',
    avatar: '',
};

describe('UserOverview', () => {
    beforeEach(() => {
        (useLocation as jest.Mock).mockReturnValue({state: userData});
    });

    it('renders header with user name', () => {
        render(<UserOverview />);

        expect(HeaderMock).toHaveBeenCalledTimes(1);
        expect(HeaderMock).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'User John Doe',
            }),
            {}
        );
    });

    it('renders TeamMemberCard with correct data and without navigation', () => {
        render(<UserOverview />);

        expect(TeamMemberCardMock).toHaveBeenCalledTimes(1);
        expect(TeamMemberCardMock).toHaveBeenCalledWith(
            expect.objectContaining({
                memberData: userData,
                hasNavigation: false,
            }),
            {}
        );
    });
});
