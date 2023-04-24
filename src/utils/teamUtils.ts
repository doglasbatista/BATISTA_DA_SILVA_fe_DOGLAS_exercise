import {ListItem, Team} from 'types';

export const mapTeamsToListItems = (teams: Team[]): ListItem[] => {
    return teams?.map(team => {
        const columns = [
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
        };
    });
};
