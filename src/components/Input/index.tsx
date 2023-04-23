import * as React from 'react';
import {InputStyled} from './styles';

const Input = (props: React.ComponentProps<typeof InputStyled>) => {
    return <InputStyled {...props} />;
};

export default Input;
