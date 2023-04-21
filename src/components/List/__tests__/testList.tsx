import React from 'react';
import {render} from '@testing-library/react';
import Card from '../../Card';
import {Spinner} from '../../Spinner';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));
jest.mock('../../Card');
jest.mock('../../Spinner');

const CardMock = Card as jest.Mock;
const SpinnerMock = Spinner as jest.Mock;

describe('List', () => {
    it('should render spinner and not render items when it is loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List isLoading items={items} />);

        expect(SpinnerMock).toHaveBeenCalledTimes(1);
        expect(CardMock).toHaveBeenCalledTimes(0);
    });

    it('should not render spinner and render items when it is not loading', () => {
        const itemOneColumns = [
            {
                key: 'columnKey1',
                value: 'columnValue1',
            },
        ];
        const items = [
            {
                id: '1',
                columns: itemOneColumns,
            },
        ];
        render(<List isLoading={false} items={items} />);

        expect(SpinnerMock).toHaveBeenCalledTimes(0);
        expect(CardMock).toHaveBeenCalledTimes(1);
        expect(CardMock).toHaveBeenCalledWith(
            expect.objectContaining({
                id: '1',
                columns: itemOneColumns,
                navigationProps: undefined,
                hasNavigation: true,
                url: undefined,
            }),
            {}
        );
    });

    it('should render multiple card when multiple items', () => {
        const itemOne = {
            id: '1',
            columns: [
                {
                    key: 'columnKey1',
                    value: 'columnValue1',
                },
            ],
        };
        const itemTwo = {
            id: '2',
            columns: [
                {
                    key: 'columnKey2',
                    value: 'columnValue2',
                },
            ],
        };
        const items = [itemOne, itemTwo];
        render(<List isLoading={false} items={items} />);

        expect(CardMock).toHaveBeenCalledTimes(2);
        expect(CardMock.mock.calls[0]).toEqual([
            {
                id: itemOne.id,
                columns: itemOne.columns,
                navigationProps: undefined,
                hasNavigation: true,
                url: undefined,
            },
            {},
        ]);
        expect(CardMock.mock.calls[1]).toEqual([
            {
                id: '2',
                columns: itemTwo.columns,
                navigationProps: undefined,
                hasNavigation: true,
                url: undefined,
            },
            {},
        ]);
    });
});
