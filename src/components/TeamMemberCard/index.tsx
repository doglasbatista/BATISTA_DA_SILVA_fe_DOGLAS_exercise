import * as React from 'react';
import Card from 'components/Card';
import {UserData} from 'types';

interface Props {
    memberData: UserData;
    isLead?: boolean;
    hasNavigation?: boolean;
}

const TeamMemberCard = ({
    memberData,
    memberData: {id, firstName, lastName, displayName, location},
    isLead = false,
    hasNavigation = true,
}: Props): JSX.Element => {
    const columns = [
        ...(isLead ? [{key: 'Team Lead', value: ''}] : []),
        {key: 'Name', value: `${firstName} ${lastName}`},
        {key: 'Display Name', value: displayName},
        {key: 'Location', value: location},
    ];
    return (
        <Card
            columns={columns}
            url={`/user/${id}`}
            hasNavigation={hasNavigation}
            navigationProps={memberData}
        />
    );
};

export default TeamMemberCard;
