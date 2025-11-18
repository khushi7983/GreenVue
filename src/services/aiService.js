// AI Service for Gemini API Integration
class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.REACT_APP_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    this.conversationHistory = [];
  }

  // Check if API key is configured
  isConfigured() {
    return this.apiKey && 
           this.apiKey !== 'your_gemini_api_key_here' && 
           this.apiKey !== undefined && 
           this.apiKey.trim() !== '';
  }

  // Generate AI response using Gemini API
  async generateResponse(userMessage, context = {}) {
    if (!this.isConfigured()) {
      console.log('AI not configured, using fallback');
      return this.getFallbackResponse(userMessage);
    }

    try {
      console.log('Making AI API call with message:', userMessage);
      
      const systemPrompt = this.buildSystemPrompt(context);
      const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\n\nPlease provide a helpful response as an AI Investment Assistant:`;

      const requestBody = {
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        }
      };

      console.log('API Request URL:', `${this.baseUrl}?key=${this.apiKey.substring(0, 10)}...`);
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response Data:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        console.log('AI Response:', aiResponse);
        
        // Store conversation history
        this.conversationHistory.push(
          { role: 'user', content: userMessage },
          { role: 'assistant', content: aiResponse }
        );

        return aiResponse;
      } else {
        console.error('Invalid API response format:', data);
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  // Build system prompt with investment context
  buildSystemPrompt(context) {
    return `You are a highly knowledgeable AI Investment Assistant for GreenVue, a platform focused on ESG (Environmental, Social, Governance) and sustainable investing. 

Your expertise includes:
- ESG fund recommendations and analysis
- Risk assessment and portfolio optimization
- Goal-based investment planning
- Sustainable and ethical investing strategies
- Indian mutual fund market knowledge
- Financial planning and wealth management

Guidelines:
- Always provide accurate, helpful investment advice
- Focus on ESG and sustainable investing when possible
- Be conversational but professional
- Avoid giving specific buy/sell recommendations without proper risk assessment
- Encourage users to complete risk assessment for personalized advice
- Reference GreenVue platform features when relevant
- Keep responses concise but informative (max 150 words)
- Always include appropriate risk disclaimers for investment advice

${context.userProfile ? `User Profile: Risk Tolerance: ${context.userProfile.riskTolerance}, Experience: ${context.userProfile.experience}` : ''}
${context.availableFunds ? `Available ESG Funds: ${context.availableFunds.length} funds in our database` : ''}`;
  }

  // Fallback response system (when API key not configured)
  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('recommend') || message.includes('suggestion')) {
      return "I'd love to provide personalized recommendations! For the best experience, please configure the Gemini API key. Meanwhile, I suggest starting with our Risk Assessment to understand your investment profile, then explore our ESG fund comparison tool.";
    } else if (message.includes('risk') || message.includes('safe')) {
      return "Risk assessment is crucial for smart investing! Higher risk can mean higher returns, but also higher potential losses. Complete our Risk Assessment questionnaire to get personalized guidance based on your risk tolerance and investment goals.";
    } else if (message.includes('goal') || message.includes('planning')) {
      return "Goal-based investing is excellent! Whether it's retirement, buying a home, or wealth building, having clear goals helps shape your investment strategy. What's your primary investment goal and timeline? I can help you create a plan.";
    } else if (message.includes('portfolio') || message.includes('rebalance')) {
      return "Portfolio rebalancing maintains your desired asset allocation over time. I can analyze your holdings and suggest optimizations. Would you like me to review your current portfolio or help you build a new ESG-focused one?";
    } else if (message.includes('esg') || message.includes('sustainable')) {
      return "ESG investing is growing rapidly! These funds consider Environmental, Social, and Governance factors alongside financial returns. They can provide competitive performance while aligning with your values. Ready to explore our ESG fund options?";
    } else {
      return "I'm here to help with your investment journey! I can assist with fund recommendations, risk assessment, goal planning, and portfolio optimization. For the most intelligent responses, consider setting up the Gemini API key. What would you like to explore?";
    }
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }

  // Get conversation context for better responses
  getConversationContext() {
    return this.conversationHistory.slice(-6); // Last 3 exchanges
  }
}

export default new AIService();