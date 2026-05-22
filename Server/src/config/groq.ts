import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export const getAIReply = async (userMessage: string, carModel: string, ownerName: string): Promise<string> => {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a professional support assistant for Vulcan Motors. 
You are helping ${ownerName}, who owns a Vulcan ${carModel}.
You ONLY answer questions related to:
- Vehicle maintenance and servicing
- The owner's Vulcan ${carModel}
- Booking service appointments  
- Car features and specifications
- Vulcan Motors products and services

If the user asks anything unrelated to Vulcan Motors or their vehicle, respond with:
"I can only assist with Vulcan Motors vehicle related questions."

Keep responses short, professional and helpful. Maximum 2-3 sentences.`,
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
    console.error('Groq error:', error)
    return 'A Vulcan specialist will be with you shortly.'
  }
}

export default groq