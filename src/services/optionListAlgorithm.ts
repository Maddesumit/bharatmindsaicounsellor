import { Student, Cutoff, ScoredCollege, OptionList, StudentPreferences, BaseCategory, CategoryVariant } from '../types';
import { calculateEligibleCategories } from './categoryService';

/**
 * Get eligible categories based on student's base category and special attributes
 * @deprecated Use calculateEligibleCategories from categoryService instead
 */
export function getEligibleCategories(
    baseCategory: string,
    hasKannada: boolean,
    hasRural: boolean,
    hasHK: boolean
): string[] {
    // Delegate to the new category service
    return calculateEligibleCategories(
        baseCategory as BaseCategory,
        hasKannada,
        hasRural,
        hasHK
    );
}

/**
 * Calculate probability of getting admission based on rank difference
 */
export function calculateProbability(studentRank: number, cutoffRank: number): number {
    const difference = cutoffRank - studentRank;

    if (difference >= 5000) return 0.95;  // Very Safe (95%)
    if (difference >= 2000) return 0.80;  // Safe (80%)
    if (difference >= 0) return 0.60;     // Target (60%)
    if (difference >= -3000) return 0.40; // Reach (40%)
    return 0.20;                          // Long Reach (20%)
}

/**
 * Determine tier based on probability
 */
export function getTier(probability: number): 'safe' | 'target' | 'reach' {
    if (probability >= 0.80) return 'safe';
    if (probability >= 0.40) return 'target';
    return 'reach';
}

/**
 * Score a college based on student preferences
 */
export function scoreCollege(
    cutoff: Cutoff,
    student: Student,
    probability: number
): number {
    let score = 0;
    const preferences = student.preferences;

    // 1. Probability weight (40%)
    score += probability * 0.4;

    // 2. Location preference (25%)
    if (preferences.locations.includes('All')) {
        score += 0.15; // Partial points for flexibility
    } else {
        // Extract city from college name
        let collegeCity = '';
        const cities = ['Bangalore', 'Mysore', 'Mangalore', 'Belgaum', 'Hubli', 'Davangere', 'Tumkur', 'Gulbarga', 'Hassan', 'Shimoga'];
        for (const city of cities) {
            if (cutoff.collegeName.includes(city)) {
                collegeCity = city;
                break;
            }
        }

        if (preferences.locations.includes(collegeCity)) {
            score += 0.25;
        } else if (collegeCity) {
            score += 0.10; // Some points for having a known city
        }
    }

    // 3. Branch preference (20%)
    if (preferences.branches.includes(cutoff.courseCode)) {
        score += 0.20;
    } else if (preferences.branches.includes('All')) {
        score += 0.10;
    }

    // 4. College type preference (15%)
    const collegeName = cutoff.collegeName.toLowerCase();
    if (preferences.collegeType === 'All') {
        score += 0.10;
    } else if (preferences.collegeType === 'Government' &&
        (collegeName.includes('university') || collegeName.includes('government'))) {
        score += 0.15;
    } else if (preferences.collegeType === 'Aided' && collegeName.includes('aided')) {
        score += 0.15;
    } else if (preferences.collegeType === 'Private') {
        score += 0.10; // Most colleges are private
    }

    return score;
}

/**
 * Generate option list for a student
 */
export function generateOptionList(
    student: Student,
    allCutoffs: Cutoff[]
): OptionList {
    const { rank, eligibleCategories, preferences } = student;

    // 1. Calculate search range
    const searchRange = {
        min: rank - 10000, // Reach colleges
        max: rank + 5000   // Safe colleges
    };

    // 2. Filter cutoffs by:
    //    - Rank range
    //    - Eligible categories
    //    - Preferred branches (if specified)
    const relevantCutoffs = allCutoffs.filter(cutoff => {
        // Check rank range
        if (cutoff.cutoffRank < searchRange.min || cutoff.cutoffRank > searchRange.max) {
            return false;
        }

        // Check category eligibility
        if (!eligibleCategories.includes(cutoff.category)) {
            return false;
        }

        // Check branch preference (if not 'All')
        if (!preferences.branches.includes('All') &&
            !preferences.branches.includes(cutoff.courseCode)) {
            return false;
        }

        return true;
    });

    // 3. Score and rank colleges
    const scoredColleges: ScoredCollege[] = relevantCutoffs.map(cutoff => {
        const probability = calculateProbability(rank, cutoff.cutoffRank);
        const score = scoreCollege(cutoff, student, probability);
        const tier = getTier(probability);

        return {
            ...cutoff,
            score,
            probability,
            tier
        };
    });

    // 4. Sort by score (highest first)
    scoredColleges.sort((a, b) => b.score - a.score);

    // 5. Group by tier
    const safe = scoredColleges.filter(c => c.tier === 'safe').slice(0, 15);
    const target = scoredColleges.filter(c => c.tier === 'target').slice(0, 20);
    const reach = scoredColleges.filter(c => c.tier === 'reach').slice(0, 15);

    return {
        safe,
        target,
        reach
    };
}

/**
 * Get best category for a student at a specific college
 */
export function getBestCategory(
    cutoffs: Cutoff[],
    student: Student,
    collegeCode: string,
    courseCode: string
): string {
    // Filter cutoffs for this specific college and course
    const relevantCutoffs = cutoffs.filter(c =>
        c.collegeCode === collegeCode &&
        c.courseCode === courseCode &&
        student.eligibleCategories.includes(c.category)
    );

    // Find the category with highest cutoff (easiest to get)
    let bestCategory = student.baseCategory;
    let highestCutoff = 0;

    for (const cutoff of relevantCutoffs) {
        if (cutoff.cutoffRank > highestCutoff && cutoff.cutoffRank >= student.rank) {
            highestCutoff = cutoff.cutoffRank;
            bestCategory = cutoff.category;
        }
    }

    return bestCategory;
}
