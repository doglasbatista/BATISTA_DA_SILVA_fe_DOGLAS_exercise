import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import {useFetchTeams} from '../data/useFetchTeams';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

export const MapT = (teams: TeamsList[]) => {
    return teams?.map(team => {
        var columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const {data, isLoading} = useFetchTeams();

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={MapT(data)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
