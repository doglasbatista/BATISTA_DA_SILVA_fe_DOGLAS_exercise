import TeamMemberCard from 'components/TeamMemberCard';
import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {mapUsersToListItems} from 'utils/teamOverviewUtils';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {useFetchTeamUsers} from '../data/useFetchTeamUsers';

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const {pageData, isLoading} = useFetchTeamUsers(teamId);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && <TeamMemberCard isLead memberData={pageData.teamLead} />}
            <List items={mapUsersToListItems(pageData?.teamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
