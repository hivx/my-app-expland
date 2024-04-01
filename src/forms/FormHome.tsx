import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputForm, BoxForm, ButtonForm, ContainerForm,
    StyleForm, TextRed } from '../Container.styled';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveForm } from '../redux/SliceForm';
import { RootState } from '../redux/Store';

interface InformationForm {
    firstname: string;
    lastname: string;
    age: number;
    job: string;
}

const InfoForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
          setValue('age', formData.age);
          setValue('job', formData.job);
        }
      }, [formData, setValue]);

    const onSubmit: SubmitHandler<InformationForm> = async(data) => {    
        await new Promise((resolve) => setTimeout(resolve, 500));
        // alert(JSON.stringify(data));
        dispatch(saveForm(data));
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
                    <InputForm
                        {...register("age")}
                        required
                        type="number"
                        label="Your Age"
                        variant="filled"
                        onKeyDown={handleKeyPress}
                    />
                    <InputForm
                        {...register("job", {
                            maxLength: {
                                value: 50,
                                message: "Maximum job of 50 characters.",
                            },
                        })}
                        required
                        type="text"
                        label="Your Job"
                        variant="filled"
                        onKeyDown={handleKeyPress}
                    />
                </BoxForm>
                <ButtonForm disabled={isSubmitting} type='submit' variant="contained">
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </ButtonForm>
            </ContainerForm>
        </StyleForm>
    );
}

export default InfoForm;
