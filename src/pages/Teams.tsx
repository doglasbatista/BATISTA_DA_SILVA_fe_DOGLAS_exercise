import * as React from 'react';
import {mapTeamsToListItems} from '../utils/teamUtils';
import {useFetchTeams} from '../data/useFetchTeams';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const {data, isLoading} = useFetchTeams();

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={mapTeamsToListItems(data)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
