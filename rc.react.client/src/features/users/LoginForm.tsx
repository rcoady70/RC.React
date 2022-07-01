import { Formik,Form, ErrorMessage } from 'formik'
import { observer } from 'mobx-react-lite'
import react from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextinput'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'

export default observer(function LoginForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required'),
    })


    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: 'bob@test.com', password: 'Pa$$w0rd', error:null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(
                                                                                error => setErrors({ error: 'Invalid email or password' }
                                                                              )
                )}
        >
            {({ handleSubmit, isSubmitting,errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login' textAlign='center' color='teal' />
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} 
                    />
                    <Button loading={isSubmitting} positive content='login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})