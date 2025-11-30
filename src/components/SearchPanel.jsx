import { useState, useEffect, useRef } from 'react';
import Button from './other/Button';
import './SearchPanel.css';

function SearchPanel({ isOpen, onClose, onUploadSelected }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBibs, setSelectedBibs] = useState([]);

    // Dummy data for now (later this will come from backend)
    const dummyBibs = [
        {
            id: 1,
            type: 'article',
            citationKey: 'doe2020ml',
            author: 'John Doe',
            title: 'Introduction to Machine Learning',
            journal: 'AI Journal',
            year: 2020,
            volume: 15,
            pages: '123-145'
        },
        {
            id: 2,
            type: 'book',
            citationKey: 'smith2021deep',
            author: 'Jane Smith',
            title: 'Deep Learning Fundamentals',
            publisher: 'Tech Books Publishing',
            year: 2021,
            address: 'New York'
        },
        {
            id: 3,
            type: 'article',
            citationKey: 'johnson2019neural',
            author: 'Mike Johnson',
            title: 'Neural Networks and AI',
            journal: 'Computer Science Review',
            year: 2019,
            volume: 8,
            pages: '45-67'
        },
        {
            id: 4,
            type: 'book',
            citationKey: 'williams2022data',
            author: 'Sarah Williams',
            title: 'Data Science Basics',
            publisher: 'Academic Press',
            year: 2022,
            address: 'London'
        },
        {
            id: 5,
            type: 'inproceedings',
            citationKey: 'brown2023ml',
            author: 'David Brown',
            title: 'Machine Learning Algorithms',
            booktitle: 'International Conference on AI',
            year: 2023,
            pages: '234-256'
        },
        {
            id: 6,
            type: 'article',
            citationKey: 'davis2021ethics',
            author: 'Emily Davis',
            title: 'Artificial Intelligence Ethics',
            journal: 'Ethics in Technology',
            year: 2021,
            volume: 12,
            pages: '89-102'
        }
    ];

    // Live search - runs whenever searchQuery changes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            const results = dummyBibs.filter(bib =>
                bib.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bib.author.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setSearchResults(results);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleCheckboxChange = (bibId) => {
        setSelectedBibs(prev => {
            if (prev.includes(bibId)) {
                return prev.filter(id => id !== bibId);
            } else {
                return [...prev, bibId];
            }
        });
    };

    const handleUpload = () => {
        const selected = searchResults.filter(bib => selectedBibs.includes(bib.id));

        console.log('=== SELECTED BIBTEX ENTRIES ===');
        console.log('Count:', selected.length);
        selected.forEach((bib, index) => {
            console.log(`\n[${index + 1}] ${bib.type.toUpperCase()}: ${bib.citationKey}`);
            console.log('Full data:', bib);
        });
        console.log('================================');

        onUploadSelected(selected);

        // Reset and close
        setSearchQuery('');
        setSearchResults([]);
        setSelectedBibs([]);
        onClose();
    };

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Delay focus slightly to wait for animation
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`panel-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div className={`search-panel ${isOpen ? 'open' : ''}`}>
                <div className="panel-header">
                    <h2>Search BibTeX</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="panel-content">
                    {/* Search Input - NO BUTTON */}
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <div className="results-section">
                            <h3>Search Results ({searchResults.length})</h3>
                            <div className="results-list">
                                {searchResults.map(bib => (
                                    <div key={bib.id} className="result-item">
                                        <input
                                            type="checkbox"
                                            id={`bib-${bib.id}`}
                                            checked={selectedBibs.includes(bib.id)}
                                            onChange={() => handleCheckboxChange(bib.id)}
                                        />
                                        <label htmlFor={`bib-${bib.id}`} className="result-info">
                                            <div className="result-title">{bib.title}</div>
                                            <div className="result-meta">
                                                {bib.author} ({bib.year})
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No results message */}
                    {searchQuery && searchResults.length === 0 && (
                        <div className="no-results">
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}

                    {/* Empty state - show when no search query */}
                    {!searchQuery && (
                        <div className="empty-state">
                            <p>Start typing to search your BibTeX database...</p>
                        </div>
                    )}

                    {/* Upload Button */}
                    {selectedBibs.length > 0 && (
                        <div className="upload-section">
                            <Button
                                text={`Upload (${selectedBibs.length} selected)`}
                                onClick={handleUpload}
                                type="primary"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SearchPanel;