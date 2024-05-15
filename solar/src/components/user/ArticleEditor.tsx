import React, { useState } from 'react';
import './userStyles.css';

const ArticleEditor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting:', title, content);
    };

    return (
        <div className="article-editor">
            <form onSubmit={handleSubmit}>
                <div className="toolbar">
                    <input
                        className="article-title-input"
                        type="text"
                        placeholder="Title of your article"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <textarea
                    className="article-textarea"
                    placeholder="Write your article here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <div className="editor-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ArticleEditor;
