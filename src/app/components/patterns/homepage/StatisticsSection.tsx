/**
 * Statistics section for the homepage.
 *
 * This section displays key performance metrics and stats.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/statistics.css`
 *
 * @module StatisticsSection
 * @category components/patterns/homepage
 */

import { StatisticsMetricsPattern } from "../StatisticsMetricsPattern";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Interface for a single statistic.
 */
interface Statistic {
  value: string;
  suffix?: string;
  label: string;
  icon: PhosphorIcon;
}

/**
 * Props for the StatisticsSection component.
 */
interface StatisticsSectionProps {
  /** Array of statistic objects to display. */
  statistics: Statistic[];
  /** Section header data (title, description). */
  section: {
    title: string;
    description: string;
  };
}

/**
 * StatisticsSection Component.
 */
export function StatisticsSection({ statistics, section }: StatisticsSectionProps) {
  return (
    <section className="wp-template-home__statistics">
      <StatisticsMetricsPattern
        title={section.title}
        description={section.description}
        statistics={statistics}
        columns={4}
      />
    </section>
  );
}

export default StatisticsSection;
