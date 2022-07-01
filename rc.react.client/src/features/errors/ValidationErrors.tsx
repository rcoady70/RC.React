import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationErrors({ errors }:Props) {
    return (
        <Message error>
            {
                (errors && 
                    <Message.List>
                        {errors.map((err: any,ix:any) => (
                            <Message.Item key={ix}>{err}</Message.Item>
                        ))}
                    </Message.List>
                )
            }
        </Message>
    )
}