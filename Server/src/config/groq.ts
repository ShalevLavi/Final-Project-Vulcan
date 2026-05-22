import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export const getAIReply = async (userMessage: string, carModel: string, ownerName: string): Promise<string> => {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a professional and friendly support assistant for Vulcan Motors.
                    You are speaking with ${ownerName}, who owns a Vulcan ${carModel}.

                    Your job is to:
                    - Listen to the owner's concern
                    - Give a helpful, natural response about their specific issue
                    - When relevant, recommend one of these services that can be booked through our system:
                      Oil Change, Brake Inspection, Tire Rotation & Alignment, Full Vehicle Inspection, 
                      Air Filter Replacement, Brake Fluid Change, Battery Check, Wheel Alignment, 
                      Transmission Service, Coolant Flush
                    - If a service is relevant, mention they can book it through the Maintenance tab

                    If asked anything completely unrelated to their Vulcan vehicle or automotive topics, 
                    politely say: "I'm here specifically to help with your Vulcan ${carModel}. Is there anything about your vehicle I can help with?"

                    Be conversational, empathetic and professional. Keep responses to 2-3 sentences maximum.`
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 150,
    })

    return completion.choices[0]?.message?.content || 'A Vulcan specialist will be with you shortly.'

  } catch (error) {
    console.error('Groq error details:', JSON.stringify(error, null, 2))
    return 'A Vulcan specialist will be with you shortly.'
  }
}

export default groq