import { useState } from 'react';
import { GeminiAnalyzer } from '@grimoire/core/gemini';
import './AIAnalyzer.css';

function AIAnalyzer() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingMock, setUsingMock] = useState(true);

  const analyzer = new GeminiAnalyzer(import.meta.env.VITE_GEMINI_API_KEY || '');

  const exampleTexts = [
    "We need to synergize our growth strategy and disrupt the market to achieve unicorn status.",
    "Let's circle back on this after we leverage our core competencies and optimize the paradigm.",
    "Our agile team is pivoting to scale our innovative ecosystem and maximize bandwidth.",
    "We're disrupting the space with bleeding-edge solutions that move the needle on key metrics."
  ];

  const tryExample = (text) => {
    setInput(text);
    setAnalysis(null);
  };

  const analyzeText = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const result = await analyzer.analyzeText(input, 'REALITY');
    const translation = await analyzer.translateBetweenModes(input, 'REALITY', 'HELL');
    
    setUsingMock(!import.meta.env.VITE_GEMINI_API_KEY);
    setAnalysis({ ...result, translation });
    setLoading(false);
  };

  return (
    <div className="ai-analyzer">
      <div className="analyzer-header">
        <h3>🤖 AI Corporate Culture Analyzer</h3>
      </div>

      {!input && !analysis && (
        <div className="examples-section">
          <p className="examples-label">💡 Try these examples:</p>
          <div className="example-buttons">
            {exampleTexts.map((text, i) => (
              <button 
                key={i}
                className="example-btn"
                onClick={() => tryExample(text)}
                title="Click to analyze this text"
              >
                {text.substring(0, 60)}...
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        placeholder="Paste corporate text here... (e.g., 'We need to synergize our growth strategy and disrupt the market')"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="analyzer-input"
        rows={4}
      />

      <div className="button-row">
        <button 
          onClick={analyzeText} 
          disabled={loading || !input.trim()}
          className="analyze-btn"
        >
          {loading ? '🔄 Analyzing...' : '🔍 Analyze Corporate Speak'}
        </button>
        {input && (
          <button 
            onClick={() => { setInput(''); setAnalysis(null); }}
            className="clear-btn"
          >
            🗑️ Clear
          </button>
        )}
      </div>

      {analysis && (
        <div className="analysis-result">
          <div className="result-section">
            <h4>📊 Analysis Results</h4>
            <div className="score-bar">
              <div className="score-label">Cult Score: {analysis.score}/100</div>
              <div className="score-progress">
                <div 
                  className="score-fill" 
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
            </div>
            <p><strong>Sentiment:</strong> <span className="sentiment-badge">{analysis.sentiment}</span></p>
            {analysis.terms.length > 0 && (
              <div className="buzzwords">
                <strong>Buzzwords Found:</strong>
                <div className="buzzword-tags">
                  {analysis.terms.map((term, i) => (
                    <span key={i} className="buzzword-tag">{term}</span>
                  ))}
                </div>
              </div>
            )}
            {analysis.terms.length === 0 && (
              <p className="no-buzzwords">✅ No corporate buzzwords detected. This text is refreshingly clear!</p>
            )}
          </div>

          <div className="result-section translation">
            <h4>⛧ Cult Translation</h4>
            <p className="translated-text">{analysis.translation}</p>
            <p className="hint">👆 This is how a cult would say the same thing!</p>
          </div>

          <div className="result-section suggestions">
            <h4>💡 Suggestions</h4>
            {analysis.score > 70 ? (
              <div className="suggestion-box warning">
                <p><strong>⚠️ High Cult Score!</strong></p>
                <p>This text is heavily laden with corporate jargon. Consider:</p>
                <ul>
                  <li>Using plain language instead of buzzwords</li>
                  <li>Being specific rather than abstract</li>
                  <li>Focusing on concrete actions and outcomes</li>
                </ul>
              </div>
            ) : analysis.score > 40 ? (
              <div className="suggestion-box moderate">
                <p><strong>⚡ Moderate Cult Score</strong></p>
                <p>Some corporate speak detected. You could improve clarity by replacing buzzwords with specific terms.</p>
              </div>
            ) : (
              <div className="suggestion-box good">
                <p><strong>✅ Low Cult Score</strong></p>
                <p>This text is relatively clear and free of excessive jargon. Good job!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAnalyzer;
