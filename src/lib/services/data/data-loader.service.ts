import { parseCSVData } from './csv-parser.service';
import { Cutoff } from '@/types';

let cachedCutoffs: Cutoff[] | null = null;

/**
 * Load and parse CSV data from public folder
 */
export async function loadCutoffData(): Promise<Cutoff[]> {
    if (cachedCutoffs) {
        return cachedCutoffs;
    }

    try {
        // Fetch CSV file from public folder
        const response = await fetch('/data/kcet_2024_r1.csv');

        if (!response.ok) {
            throw new Error(`Failed to load CSV file: ${response.statusText}`);
        }

        // Read file content
        const csvText = await response.text();

        // Parse CSV
        const cutoffs = parseCSVData(csvText);

        // Cache for future use
        cachedCutoffs = cutoffs;

        console.log(`✅ Loaded ${cutoffs.length} cutoff records`);

        return cutoffs;
    } catch (error) {
        console.error('❌ Error loading cutoff data:', error);
        throw error;
    }
}

/**
 * Clear cache (useful for testing)
 */
export function clearCache(): void {
    cachedCutoffs = null;
}
