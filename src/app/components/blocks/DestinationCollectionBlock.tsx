/**
 * Destination Collection Block
 * WordPress equivalent: Query Loop targeting postType: destination
 * 
 * Displays collection of destinations using core/query + core/post-template pattern.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useMemo } from 'react';
import { MagnifyingGlass as Search, Globe, Compass } from '@phosphor-icons/react';
import { DestinationCard } from '../patterns/DestinationCard';
import { CardGrid } from '../patterns/CardGrid';
import { Button } from '../blocks/design/Button';
import { HeadingBlock } from '../blocks/core/HeadingBlock';
import { ParagraphBlock } from '../blocks/core/ParagraphBlock';
import type { Destination } from '../../data/types';
import { motion as Motion, AnimatePresence } from 'motion/react';
import './DestinationCollectionBlock.css';

interface DestinationCollectionBlockProps {
  destinations: Destination[];
  showSearch?: boolean;
  emptyMessage?: string;
  parentId?: string;
  onSelect?: (destination: Destination) => void;
  title?: string;
  description?: string;
}

export function DestinationCollectionBlock({ 
  destinations, 
  showSearch = false,
  emptyMessage = 'No territories found matching your refined criteria',
  parentId,
  onSelect,
  title,
  description
}: DestinationCollectionBlockProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const preparedDestinations = useMemo(() => {
    let filtered = destinations;
    
    if (parentId) {
      filtered = filtered.filter(dest => dest.parentId === parentId);
    } else if (destinations.some(d => !d.parentId)) {
      filtered = filtered.filter(dest => !dest.parentId);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dest =>
        dest.title.toLowerCase().includes(query) ||
        dest.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [destinations, parentId, searchQuery]);

  return (
    <section className="wp-block-lts-destination-collection">
      {/* Dynamic Header */}
      {(title || description || showSearch) && (
        <header className="wp-block-lts-destination-collection__header">
          <div className="wp-block-lts-destination-collection__header-inner">
            <div className="wp-block-lts-destination-collection__title-area">
              {title && (
                <HeadingBlock level={2} className="wp-block-lts-destination-collection__title">
                  {title}
                </HeadingBlock>
              )}
              {description && (
                <ParagraphBlock className="wp-block-lts-destination-collection__description">
                  {description}
                </ParagraphBlock>
              )}
            </div>

            {showSearch && (
              <div className="wp-block-lts-destination-collection__search-wrapper">
                <div className="wp-block-lts-destination-collection__search-field">
                  <Globe className="wp-block-lts-destination-collection__search-icon" />
                  <input
                    type="search"
                    placeholder="Search territories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="wp-block-lts-destination-collection__search-input"
                  />
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Results ecosystem */}
      <AnimatePresence mode="wait">
        {preparedDestinations.length > 0 ? (
          <Motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CardGrid columns={3} animated gap="lg">
              {preparedDestinations.map(destination => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination}
                  onClick={() => onSelect?.(destination)}
                  animated
                />
              ))}
            </CardGrid>
            
            {/* Intelligent Footer */}
            <footer className="wp-block-lts-destination-collection__footer">
              <div className="wp-block-lts-destination-collection__count-badge">
                <Globe className="size-3 text-primary" />
                <span className="wp-block-lts-destination-collection__count-text">
                  Exploring {preparedDestinations.length} Global Territories
                </span>
              </div>
            </footer>
          </Motion.div>
        ) : (
          <Motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="wp-block-lts-destination-collection__empty"
          >
            <div className="wp-block-lts-destination-collection__empty-icon-wrapper">
              <Compass className="wp-block-lts-destination-collection__empty-icon" />
            </div>
            <HeadingBlock level={3} className="wp-block-lts-destination-collection__empty-title">
              Territory Not Cataloged
            </HeadingBlock>
            <ParagraphBlock className="wp-block-lts-destination-collection__empty-text">
              {searchQuery ? `Your search for "${searchQuery}" returned no exact matches in our curated database.` : emptyMessage}
            </ParagraphBlock>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="wp-block-lts-destination-collection__reset-btn"
            >
              Reset Territory Parameters
            </Button>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default DestinationCollectionBlock;
