import {useState} from 'react';

interface UseTypeahead {
    searchValue: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useTypeahead = (): UseTypeahead => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return {searchValue, handleSearchChange};
};
