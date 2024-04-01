import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputForm, BoxForm, ButtonForm, ContainerForm,
    StyleForm, TextRed } from '../Container.styled';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

interface InformationForm {
    firstname: string;
    lastname: string;
}

const EditForm: React.FC = () => {
    const navigate = useNavigate();
    const formData = useSelector((state: RootState) => state.formData);

    const onSubmitSuccess = () => {
        setTimeout(() => {
            navigate('/todo');
        }, 500);
    }
    //react hook form
    const { 
        register, 
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting} 
    } = useForm<InformationForm>();

    useEffect(() => {
        if (formData) {
          setValue('firstname', formData.firstname);
          setValue('lastname', formData.lastname);

        }
      }, [formData, setValue]);

    const onSubmit: SubmitHandler<InformationForm> = async(data) => {    
        await new Promise((resolve) => setTimeout(resolve, 500));
        // alert(JSON.stringify(data));
        onSubmitSuccess();
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            //...
        }
    };

    return (
        <StyleForm onSubmit={handleSubmit(onSubmit)}>
            <CssBaseline />
            <ContainerForm fixed>
                <BoxForm>
                    <InputForm
                        {...register("firstname", {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            maxLength: {
                                value: 10,
                                message: "Maximum firstname of 10 characters.",
                            },
                        })}
                        required
                        type="text"
                        label="First Name"
                        variant="filled"
                        onKeyDown={handleKeyPress}
                    />
                    {errors.firstname && (
                        <TextRed>Please fill out a-z.</TextRed>)}
                    <InputForm
                        {...register("lastname", {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            maxLength: {
                                value: 10,
                                message: "Maximum lastname of 10 characters.",
                            },
                        })}
                        required
                        type="text"
                        label="Last Name"
                        variant="filled"
                        onKeyDown={handleKeyPress}
                    />
                    {errors.lastname && (
                        <TextRed>Please fill out a-z.</TextRed>)}
                </BoxForm>
                <ButtonForm disabled={isSubmitting} type='submit' variant="contained">
                    {isSubmitting ? 'Loading...' : 'Done'}
                </ButtonForm>
            </ContainerForm>
        </StyleForm>
    );
}

export default EditForm;
