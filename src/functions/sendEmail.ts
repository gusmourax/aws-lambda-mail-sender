import sgMail from '@sendgrid/mail';
import { APIGatewayProxyHandler } from "aws-lambda";

interface IEmailRequest {
    to: string;
    subject: string;
    content: string;
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const { content, subject, to } = JSON.parse(event.body) as IEmailRequest;

        await sgMail.send({
            to,
            from: process.env.FROM_EMAIL,
            subject,
            text: content,
        });

        return {
            body: JSON.stringify({ message: 'Sucesso!' }),
            statusCode: 200,
        }
    } catch (error) {
        return {
            body: JSON.stringify({ message: 'Erro ao enviar e-mail.' }),
            statusCode: 500,
        }
    }
}