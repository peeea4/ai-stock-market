'use client';

import { CountrySelectField } from '@/components/forms/CountrySelectField';
import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { Button } from '@/components/ui/button';
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology',
		},
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<SignUpFormData> = (data: SignUpFormData) => {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1 className='form-title'>Sign Up & Personalize</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<InputField
					name='fullName'
					label='Full Name'
					placeholder='John Doe'
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full Name is required', minLength: 2 }}
				/>
				<InputField
					name='email'
					label='Email'
					placeholder='user@email.com'
					register={register}
					error={errors.email}
					validation={{
						required: 'Email is required',
						pattern: /^w+@\w+\.\w$/,
						message: 'Email address is required',
					}}
				/>
				<InputField
					name='password'
					type='password'
					label='Password'
					placeholder='Enter a strong password'
					register={register}
					error={errors.password}
					validation={{
						required: 'Password is required',
						minLength: 8,
					}}
				/>
				<CountrySelectField
					name='country'
					label='Country'
					control={control}
					error={errors.country}
					required
				/>
				<SelectField
					name='investmentGoals'
					label='Investment Goal'
					placeholder='Select Your Investment Goal'
					options={INVESTMENT_GOALS}
					control={control}
					error={errors.investmentGoals}
					required
				/>
				<SelectField
					name='riskTolerance'
					label='Risk Tolerance'
					placeholder='Select Your Risk Level'
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>
				<SelectField
					name='preferredIndustry'
					label='Preferred Industry'
					placeholder='Select Your Preferred Industry'
					options={PREFERRED_INDUSTRIES}
					control={control}
					error={errors.preferredIndustry}
					required
				/>
				<Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
					{isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
				</Button>
				<FooterLink text='Already have an Account?' linkText='Sign In' href='/sign-in' />
			</form>
		</>
	);
};

export default SignUp;
