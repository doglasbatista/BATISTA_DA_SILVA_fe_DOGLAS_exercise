import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {useFetchTeamUsers} from '../data/useFetchTeamUsers';

// TODO: extract this into a separete file
export const mapArray = (users: UserData[]) => {
    return users.map(u => {
        var columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

var mapTLead = tlead => {
    var columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const {pageData, isLoading} = useFetchTeamUsers(teamId);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && mapTLead(pageData.teamLead)}
            <List items={mapArray(pageData?.teamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
