import {renderHook, act} from '@testing-library/react';
import {useTypeahead} from '../useTypeahead';

describe('useTypeahead', () => {
    it('should update search value on input change', () => {
        const {result} = renderHook(() => useTypeahead());
        expect(result.current.searchValue).toBe('');

        act(() => {
            result.current.handleSearchChange({
                target: {value: 'test'},
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.searchValue).toBe('test');
    });
});
