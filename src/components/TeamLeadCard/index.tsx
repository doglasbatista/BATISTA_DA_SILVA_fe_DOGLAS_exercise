import * as React from 'react';
import Card from 'components/Card';
import {UserData} from 'types';

interface Props {
    teamLead: UserData;
}

const TeamLeadCard = ({
    teamLead,
    teamLead: {id, firstName, lastName, displayName, location},
}: Props): JSX.Element => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${firstName} ${lastName}`,
        },
        {
            key: 'Display Name',
            value: displayName,
        },
        {
            key: 'Location',
            value: location,
        },
    ];
    return <Card columns={columns} url={`/user/${id}`} navigationProps={teamLead} />;
};

export default TeamLeadCard;
