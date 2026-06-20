/**
 * Step line bar component properties
 */
export interface Ui3nStepLineBarProps {
  /**
   * Root element id
   */
  id?: string;
  /**
   * Step label
   */
  label: string;
  /**
   * Current step
   */
  current: number;
  /**
   * Total number of steps
   */
  steps: number;
}
