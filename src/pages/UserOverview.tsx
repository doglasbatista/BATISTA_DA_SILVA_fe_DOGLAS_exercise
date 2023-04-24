import TeamMemberCard from 'components/TeamMemberCard';
import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const UserOverview = () => {
    const location = useLocation();
    return (
        <Container>
            <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
            <TeamMemberCard hasNavigation={false} memberData={location.state} />
        </Container>
    );
};

export default UserOverview;
