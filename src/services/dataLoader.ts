import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { parseCSVData } from './csvParser';
import { Cutoff } from '../types';

let cachedCutoffs: Cutoff[] | null = null;

/**
 * Load and parse CSV data
 */
export async function loadCutoffData(): Promise<Cutoff[]> {
    if (cachedCutoffs) {
        return cachedCutoffs;
    }

    try {
        // Load CSV file from assets
        const asset = Asset.fromModule(require('../../assets/kcet_2024_r1.csv'));
        await asset.downloadAsync();

        if (!asset.localUri) {
            throw new Error('Failed to load CSV file');
        }

        // Read file content
        const csvText = await FileSystem.readAsStringAsync(asset.localUri);

        // Parse CSV
        const cutoffs = parseCSVData(csvText);

        // Cache for future use
        cachedCutoffs = cutoffs;

        console.log(`Loaded ${cutoffs.length} cutoff records`);

        return cutoffs;
    } catch (error) {
        console.error('Error loading cutoff data:', error);
        throw error;
    }
}

/**
 * Clear cache (useful for testing)
 */
export function clearCache(): void {
    cachedCutoffs = null;
}
