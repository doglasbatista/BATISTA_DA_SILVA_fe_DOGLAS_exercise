import {renderHook, act} from '@testing-library/react';
import {useDebounce} from '../useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return the initial value', () => {
        const {result} = renderHook(() => useDebounce({value: 'initial value', delay: 300}));
        expect(result.current).toBe('initial value');
    });

    it('should update the debounced value after the specified delay', () => {
        const {result, rerender} = renderHook(({value, delay}) => useDebounce({value, delay}), {
            initialProps: {value: 'initial value', delay: 300},
        });

        rerender({value: 'updated value', delay: 300});

        expect(result.current).toBe('initial value');

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('updated value');
    });

    it('should not update the debounced value if the delay has not passed', () => {
        const {result, rerender} = renderHook(({value, delay}) => useDebounce({value, delay}), {
            initialProps: {value: 'initial value', delay: 300},
        });

        rerender({value: 'updated value', delay: 300});

        expect(result.current).toBe('initial value');

        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(result.current).toBe('initial value');
    });
});
