import './InterviewSummary.css';

export default function InterviewSummary({
    history,
    questions,
    setStage,
    setQuestions,
    setHistory,
    setCurrentIndex,
    setAnswer,
    setFeedback,
}){
    const overallScore = Math.round(
        history.reduce((sum,h)=> sum + parseInt(h.score),0)/history.length);

    const handleRestart = () => {
        setStage("setup");
        setQuestions([]);
        setHistory([]);
        setCurrentIndex(0);
        setAnswer("");
        setFeedback(null);
    };

    return (
        <div className='summary-container'>
            <div className='overall-score-card'>
                <p className='overall-label'>Overall Score</p>
                <h1 className= 'overall-score'>{overallScore}/10</h1>
            </div>

            <h2 className='summary-heading'>Question Summary</h2>

            {history.map((h,i) => (
                <div key={i} className='summary-card'>
                    <div className='summary-header'>
                        <span className='question-type'>Q{i+1} . {h.type}</span>

                        <span className={`score-badge ${
                            parseInt(h.score) >= 7
                            ? 'good'
                            : parseInt(h.score) >= 5
                            ? 'average'
                            : 'poor' 
                        }`}
                        >
                            {h.score}/10
                        </span>
                    </div>

                    <p className='summary-question'>{h.question}</p>
                    <p className='summary-feedback'>{h.feedback}</p>
                    </div>
                ))}

                <button 
                onClick={handleRestart}
                className='primary-btn'
                >
                    Start New Interview
                </button>
        </div>
    );
}