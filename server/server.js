import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: './vars/.env' });

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.status(200).send({
		message: 'Hello',
	});
});

app.post('/', async (req, res) => {
	try {
		const prompt = req.body.prompt;
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `give me a ${prompt} progression in notation`,
			temperature: 0.1,
			max_tokens: 200,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		res.status(200).send({
			bot: response.data.choices[0].text,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ error });
	}
});

app.listen(4999, () =>
	console.log('Server is running on port http://localhost:4999')
);
