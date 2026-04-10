import { sendWelcomeEmail } from '../nodemailer';
import { inngest } from './client';
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts';
import OpenAI from 'openai';

export const sendSignUpEmail = inngest.createFunction(
	{ id: 'sign-up-email' },
	{ event: 'app/user.created' },
	async ({ event, step }) => {
		const userProfile = `
    - Country: ${event.data.country}
    - Investment goals: ${event.data.investmentGoals}
    - Risk tolerance: ${event.data.riskTolerance}
    - Preferred industry: ${event.data.preferredIndustry}
    `;

		const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

		const response = await step.run('generate-welcome-intro', async () => {
			const client = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY,
			});

			const completion = await client.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'You are an assistant that writes friendly, professional welcome emails for a fintech app.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				temperature: 0.8,
				max_tokens: 300,
			});

			const text =
				completion.choices?.[0]?.message?.content?.trim() ||
				'Welcome to Ai Stock App! Let’s make smarter investment moves together.';

			return text;
		});

		// Step 2: Send email using existing nodemailer logic
		await step.run('send-welcome-email', async () => {
			const {
				data: { email, name },
			} = event;

			return await sendWelcomeEmail({
				email,
				name,
				intro: response,
			});
		});

		return {
			success: true,
			message: 'Welcome email sent successfully via OpenAI',
		};
	}
);
