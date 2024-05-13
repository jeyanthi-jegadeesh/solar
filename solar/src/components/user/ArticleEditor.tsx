import React, { useState, ChangeEvent } from 'react';
import './userStyles.css';
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaListOl } from 'react-icons/fa';

interface StyleState {
    fontWeight: 'bold' | 'normal';
    fontStyle: 'italic' | 'normal';
    textDecoration: 'underline' | 'none';
    fontSize: string;
    textAlign: 'left' | 'center' | 'right';
    color: string;
    listStyleType?: 'disc' | 'decimal' | 'none';
}

const ArticleEditor: React.FC = () => {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [style, setStyle] = useState<StyleState>({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        fontSize: '16px',
        textAlign: 'left',
        color: 'white',
        listStyleType: 'none'
    });

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const applyStyle = (newStyle: Partial<StyleState>) => {
        setStyle({ ...style, ...newStyle });
    };

    const handleSubmit = () => {
        console.log("Submitting Article:", title, content);
    };

    return (
        <div className="article-editor">
            <input 
                type="text" 
                placeholder="Title of your article"
                value={title}
                onChange={handleTitleChange}
                className="article-title-input"
            />
            <div className="toolbar">
                <button className="icon-button" onClick={() => applyStyle({ fontWeight: style.fontWeight === 'bold' ? 'normal' : 'bold' })}><FaBold /></button>
                <button className="icon-button" onClick={() => applyStyle({ fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' })}><FaItalic /></button>
                <button className="icon-button" onClick={() => applyStyle({ textDecoration: style.textDecoration === 'underline' ? 'none' : 'underline' })}><FaUnderline /></button>
                <button className="icon-button" onClick={() => applyStyle({ textAlign: 'left' })}><FaAlignLeft /></button>
                <button className="icon-button" onClick={() => applyStyle({ textAlign: 'center' })}><FaAlignCenter /></button>
                <button className="icon-button" onClick={() => applyStyle({ textAlign: 'right' })}><FaAlignRight /></button>
                <button className="icon-button" onClick={() => applyStyle({ listStyleType: 'disc' })}><FaListUl /></button>
                <button className="icon-button" onClick={() => applyStyle({ listStyleType: 'decimal' })}><FaListOl /></button>
                <select className="font-size-selector" onChange={(e) => applyStyle({ fontSize: e.target.value })}>
                    <option value="12px">Small</option>
                    <option value="16px">Medium</option>
                    <option value="20px">Large</option>
                </select>
                <input type="color" className="text-color-picker" onChange={(e: ChangeEvent<HTMLInputElement>) => applyStyle({ color: e.target.value })} />
            </div>
            <textarea 
                placeholder="Write your article here..."
                value={content} 
                onChange={handleContentChange} 
                className="article-textarea"
                style={style}
            />
            <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    );
};

export default ArticleEditor;
