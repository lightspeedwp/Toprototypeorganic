/**
 * Tour Collection Block
 * WordPress equivalent: Query Loop targeting postType: tour
 * 
 * Displays collection of tours using core/query + core/post-template pattern.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState, useMemo } from 'react';
import { MagnifyingGlass as Search, Compass, ArrowRight, SquaresFour as LayoutGrid } from '@phosphor-icons/react';
import { TourCard } from '../patterns/TourCard';
import { CardGrid } from '../patterns/CardGrid';
import { Button } from '../blocks/design/Button';
import { HeadingBlock } from '../blocks/core/HeadingBlock';
import { ParagraphBlock } from '../blocks/core/ParagraphBlock';
import type { Tour } from '../../data/types';
import { motion as Motion, AnimatePresence } from 'motion/react';
import './TourCollectionBlock.css';

interface TourCollectionBlockProps {
  tours: Tour[];
  showSearch?: boolean;
  emptyMessage?: string;
  onSelect?: (tour: Tour) => void;
  title?: string;
  description?: string;
}

export function TourCollectionBlock({ 
  tours, 
  showSearch = false,
  emptyMessage = 'No tours found matching your refined criteria',
  onSelect,
  title,
  description
}: TourCollectionBlockProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    return tours.filter(tour =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tours, searchQuery]);

  return (
    <section className="wp-block-lts-tour-collection p-[0px]">
      {/* Dynamic Header */}
      {(title || description || showSearch) && (
        <div className="wp-block-lts-tour-collection__header">
          <div className="wp-block-lts-tour-collection__header-inner">
            <div className="wp-block-lts-tour-collection__title-area">
              {title && (
                <HeadingBlock level={2} className="wp-block-lts-tour-collection__title">
                  {title}
                </HeadingBlock>
              )}
              {description && (
                <ParagraphBlock className="wp-block-lts-tour-collection__description">
                  {description}
                </ParagraphBlock>
              )}
            </div>

            {showSearch && (
              <div className="wp-block-lts-tour-collection__search-wrapper">
                <div className="wp-block-lts-tour-collection__search-field">
                  <Search className="wp-block-lts-tour-collection__search-icon" />
                  <input
                    type="search"
                    placeholder="Search expeditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="wp-block-lts-tour-collection__search-input"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Ecosystem */}
      <AnimatePresence mode="wait">
        {filteredTours.length > 0 ? (
          <Motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CardGrid columns={3} animated>
              {filteredTours.map(tour => (
                <TourCard 
                  key={tour.id} 
                  tour={tour}
                  onClick={() => onSelect?.(tour)}
                />
              ))}
            </CardGrid>
            
            {/* Intelligent Footer */}
            <footer className="wp-block-lts-tour-collection__footer">
              <div className="wp-block-lts-tour-collection__count-badge">
                <LayoutGrid className="size-3 text-primary" />
                <span className="wp-block-lts-tour-collection__count-text">
                  Displaying {filteredTours.length} Curated Records
                </span>
              </div>
              
              {filteredTours.length < tours.length && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="wp-block-lts-tour-collection__view-full"
                >
                  View Full Collection <ArrowRight className="size-3" />
                </button>
              )}
            </footer>
          </Motion.div>
        ) : (
          <Motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="wp-block-lts-tour-collection__empty"
          >
            <div className="wp-block-lts-tour-collection__empty-icon-wrapper">
              <Compass className="wp-block-lts-tour-collection__empty-icon" />
            </div>
            <HeadingBlock level={3} className="wp-block-lts-tour-collection__empty-title">
              No Records Found
            </HeadingBlock>
            <ParagraphBlock className="wp-block-lts-tour-collection__empty-text">
              {searchQuery ? `Your search for "${searchQuery}" returned no exact matches in our curated database.` : emptyMessage}
            </ParagraphBlock>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="wp-block-lts-tour-collection__reset-btn"
            >
              Reset Exploration Parameters
            </Button>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default TourCollectionBlock;
