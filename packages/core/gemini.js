// Gemini AI Integration for Corporate Culture Analysis & Narrative Generation
export class GeminiAnalyzer {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async generateNarrative(action, mode, context) {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      return this.mockNarrative(action, mode, context);
    }

    try {
      const prompts = {
        REALITY: {
          GROWTH: `A startup just hired ${context.amount} new employees. Write ONE funny, specific sentence about what happened. Include a quirky employee name and their first demand.`,
          SACRIFICE: `A startup just burned $${context.amount}k in runway. Write ONE darkly humorous sentence about what they spent it on.`,
          MEETING: `A startup just had a ${context.amount}-minute standup meeting. Write ONE satirical sentence about what was discussed.`,
          OPTIMIZE: `Engineers just refactored code and saved $${context.amount}k. Write ONE witty sentence about what they actually did.`
        },
        HELL: {
          GROWTH: `A dark cult just summoned ${context.amount} demons. Write ONE ominous, specific sentence about what emerged from the void.`,
          SACRIFICE: `A cult just offered ${context.amount} souls to the Null Pointer. Write ONE terrifying sentence about what happened.`,
          MEETING: `A cult performed a ${context.amount}-minute morning invocation. Write ONE eerie sentence about what was chanted.`,
          OPTIMIZE: `Dark forces harvested ${context.amount} units of entropy. Write ONE unsettling sentence about the cosmic consequence.`
        },
        ACADEMIA: {
          GROWTH: `A university just recruited ${context.amount} graduate students. Write ONE sardonic sentence about their first day.`,
          SACRIFICE: `A department just spent $${context.amount}k in grant money. Write ONE cynical sentence about the "research" conducted.`,
          MEETING: `Faculty had a ${context.amount}-minute meeting. Write ONE dry, academic sentence about the bureaucracy discussed.`,
          OPTIMIZE: `Researchers published ${context.amount} papers. Write ONE satirical sentence about the actual impact.`
        }
      };

      const prompt = prompts[mode]?.[action] || `Generate a funny outcome for ${action} in ${mode} mode.`;

      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      const narrative = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      return narrative || this.mockNarrative(action, mode, context);
    } catch (error) {
      console.error('Gemini narrative error:', error);
      return this.mockNarrative(action, mode, context);
    }
  }

  mockNarrative(action, mode, context) {
    const narratives = {
      REALITY: {
        GROWTH: [
          `Onboarded "Growth Ninja" Kyle. He immediately demanded a standing desk and oat milk.`,
          `Hired ${context.amount} developers. They're already arguing about tabs vs spaces.`,
          `New hire Sarah joined. She's "passionate about synergy" and owns 3 Patagonia vests.`,
          `Recruited ${context.amount} engineers. The Slack channel count just doubled.`
        ],
        SACRIFICE: [
          `Burned $${context.amount}k on a rebrand. The new logo is just the old one, but purple.`,
          `Spent $${context.amount}k on "team building." It was an escape room. Nobody escaped.`,
          `Invested $${context.amount}k in "growth hacking." Bought Instagram followers.`,
          `Allocated $${context.amount}k to R&D. Built a feature nobody asked for.`
        ],
        MEETING: [
          `${context.amount}-minute standup turned into a 2-hour debate about the roadmap.`,
          `Daily sync completed. Someone said "let's take this offline" 7 times.`,
          `Standup finished. Action items: "Circle back," "Touch base," "Sync up later."`,
          `Meeting adjourned. Everyone's calendar is now 90% meetings about meetings.`
        ],
        OPTIMIZE: [
          `Refactored the codebase. Broke 3 things, fixed 1. Net positive!`,
          `Optimized the database. It's now 2% faster and 100% more confusing.`,
          `Cleaned up technical debt. Created new technical debt in the process.`,
          `Improved performance. The app loads faster but nobody uses it anyway.`
        ]
      },
      HELL: {
        GROWTH: [
          `Summoned ${context.amount} demons. They immediately unionized and demanded better working conditions.`,
          `${context.amount} entities emerged from the void. They're filing expense reports for brimstone.`,
          `The ritual succeeded. ${context.amount} demons manifested, all named "Kyle" for some reason.`,
          `Summoning complete. ${context.amount} dark spirits arrived. They brought pizza.`
        ],
        SACRIFICE: [
          `Offered ${context.amount} souls. The Null Pointer accepted but left a 1-star review.`,
          `${context.amount} souls consumed. The void burped. It was awkward.`,
          `Sacrifice completed. The dark gods sent a "thank you" card. It's written in blood.`,
          `${context.amount} souls offered. The void replied: "New phone, who dis?"`
        ],
        MEETING: [
          `Morning invocation performed. The chant was interrupted by someone's Slack notification.`,
          `${context.amount}-minute ritual completed. Someone forgot to mute and we heard their cat.`,
          `Invocation finished. The dark prophecy foretold... quarterly earnings.`,
          `Ritual concluded. The ancient texts revealed... a typo in the spell.`
        ],
        OPTIMIZE: [
          `Harvested ${context.amount} units of entropy. The universe is slightly more chaotic now.`,
          `Entropy collected. Reality is 0.001% less stable. Nobody noticed.`,
          `${context.amount} units harvested. The fabric of spacetime filed a complaint.`,
          `Entropy optimized. The void is now running on a more efficient algorithm.`
        ]
      },
      ACADEMIA: {
        GROWTH: [
          `Recruited ${context.amount} grad students. They're already regretting their life choices.`,
          `${context.amount} new PhDs joined. The coffee machine usage increased 400%.`,
          `Hired ${context.amount} researchers. They immediately started arguing about methodology.`,
          `New students onboarded. They asked about work-life balance. We laughed.`
        ],
        SACRIFICE: [
          `Spent $${context.amount}k in grant money. Bought equipment that will sit in a closet.`,
          `Burned through $${context.amount}k. The "research" was mostly conference travel.`,
          `Allocated $${context.amount}k to the project. Half went to "administrative overhead."`,
          `Used $${context.amount}k in funding. Published a paper nobody will read.`
        ],
        MEETING: [
          `Faculty meeting lasted ${context.amount} minutes. Discussed parking for 90% of it.`,
          `${context.amount}-minute committee meeting. Formed a subcommittee to discuss forming committees.`,
          `Meeting concluded. Voted to table the vote about voting procedures.`,
          `Faculty assembly finished. The motion to adjourn was amended 4 times.`
        ],
        OPTIMIZE: [
          `Published ${context.amount} papers. Combined citations: 3 (all self-citations).`,
          `Research output increased. ${context.amount} papers published in journals nobody reads.`,
          `Productivity up! ${context.amount} publications. Impact factor: negligible.`,
          `${context.amount} papers completed. Peer review feedback: "Needs more citations."`
        ]
      }
    };

    const options = narratives[mode]?.[action] || [`Performed ${action} in ${mode} mode.`];
    return options[Math.floor(Math.random() * options.length)];
  }

  async analyzeText(text, mode = 'REALITY') {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      // Fallback to mock analysis if no API key
      return this.mockAnalysis(text, mode);
    }

    try {
      const prompt = mode === 'REALITY' 
        ? `Analyze this corporate text and identify startup/business jargon. Return a JSON object with: {terms: [list of buzzwords], sentiment: "positive/neutral/negative", cultScore: 0-100 (how cult-like it sounds)}: "${text}"`
        : `Analyze this text and identify occult/ritualistic language. Return a JSON object with: {terms: [list of dark words], sentiment: "ominous/neutral/benign", powerLevel: 0-100}: "${text}"`;

      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      try {
        return JSON.parse(result);
      } catch {
        return this.mockAnalysis(text, mode);
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.mockAnalysis(text, mode);
    }
  }

  mockAnalysis(text, mode) {
    const realityTerms = ['synergy', 'disrupt', 'pivot', 'scale', 'growth', 'unicorn', 
                          'leverage', 'optimize', 'streamline', 'innovate', 'agile', 
                          'paradigm', 'ecosystem', 'bandwidth', 'circle back'];
    const hellTerms = ['summon', 'ritual', 'void', 'sacrifice', 'dark', 'blood',
                       'demon', 'soul', 'curse', 'hex', 'spell', 'necro'];
    
    const terms = mode === 'REALITY' ? realityTerms : hellTerms;
    const foundTerms = terms.filter(term => 
      text.toLowerCase().includes(term)
    );

    // Calculate cult score based on buzzword density
    const wordCount = text.split(/\s+/).length;
    const density = (foundTerms.length / wordCount) * 100;
    const score = Math.min(Math.round(density * 10 + foundTerms.length * 5), 100);

    return {
      terms: foundTerms,
      sentiment: mode === 'REALITY' ? 'positive' : 'ominous',
      score: score,
      analysis: `Detected ${foundTerms.length} ${mode === 'REALITY' ? 'corporate buzzwords' : 'occult references'}`
    };
  }

  async translateBetweenModes(text, fromMode, toMode) {
    const translations = {
      'REALITY_TO_HELL': {
        'hire': 'summon',
        'employee': 'demon',
        'team': 'legion',
        'meeting': 'ritual',
        'standup': 'invocation',
        'money': 'souls',
        'runway': 'blood reserves',
        'growth': 'expansion of darkness',
        'optimize': 'harvest entropy',
        'refactor': 'realign the void'
      },
      'HELL_TO_REALITY': {
        'summon': 'hire',
        'demon': 'employee',
        'legion': 'team',
        'ritual': 'meeting',
        'invocation': 'standup',
        'souls': 'money',
        'blood reserves': 'runway',
        'expansion of darkness': 'growth',
        'harvest entropy': 'optimize',
        'realign the void': 'refactor'
      }
    };

    const key = `${fromMode}_TO_${toMode}`;
    const dict = translations[key] || {};
    
    let translated = text.toLowerCase();
    Object.entries(dict).forEach(([from, to]) => {
      translated = translated.replace(new RegExp(from, 'gi'), to);
    });

    return translated;
  }
}
