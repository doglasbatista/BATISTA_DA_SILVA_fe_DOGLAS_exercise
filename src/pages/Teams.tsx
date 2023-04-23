import * as React from 'react';
import {mapTeamsToListItems} from 'utils/teamUtils';
import {useFetchTeams} from 'data/useFetchTeams';
import Header from 'components/Header';
import List from 'components/List';
import {Container} from 'components/GlobalComponents';
import Input from 'components/Input';
import {useTypeahead} from 'hooks/useTypeahead';
import {useDebounce} from 'hooks/useDebounce';
import {Team} from 'types';

export const filteredTeams = (data: Team[], debouncedSearchValue: string) => {
    return data?.filter(team =>
        team.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
};

const Teams = () => {
    const {data, isLoading} = useFetchTeams();
    const {searchValue, handleSearchChange} = useTypeahead();
    const debouncedSearchValue = useDebounce({value: searchValue, delay: 300});

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            {!isLoading && (
                <Input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search teams..."
                />
            )}
            <List
                items={mapTeamsToListItems(filteredTeams(data, debouncedSearchValue))}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default Teams;
