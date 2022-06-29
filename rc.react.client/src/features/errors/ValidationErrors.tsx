import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[] | null;
}

export default function ValidationErrors({ errors }:Props) {
    return (
        <Message error>
            {
                (errors && 
                    <Message.List>
                        {errors.map((err: any,ix) => (
                            <Message.Item key={ix}>{err}</Message.Item>
                        ))}
                    </Message.List>
                )
            }
        </Message>
    )
}