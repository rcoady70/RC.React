import { Formik, Form, ErrorMessage } from 'formik'
import { observer } from 'mobx-react-lite'
import react from 'react'
import { Button, Header} from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextinput'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors'

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required'),
        displayName: Yup.string().required('Password is required'),
        userName: Yup.string().required('Password is required'),
    })


    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{displayName:'',userName:'', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(
                                                                                    error => setErrors({ error: error }
                                                                                 )
            )}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                //Class error required to ensure errors will show id set
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up' textAlign='center'  color='teal' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='userName' placeholder='Username' />
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        content='Register'
                        type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})