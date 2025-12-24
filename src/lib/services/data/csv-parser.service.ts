import { Cutoff, CutoffRow, College } from '@/types';

const CATEGORIES = [
    '1G', '1K', '1R',
    '2AG', '2AK', '2AR',
    '2BG', '2BK', '2BR',
    '3AG', '3AK', '3AR',
    '3BG', '3BK', '3BR',
    'GM', 'GMK', 'GMR',
    'SCG', 'SCK', 'SCR',
    'STG', 'STK', 'STR'
];

/**
 * Parse college code and name from combined field
 * Example: "E001 University of Visvesvaraya College of Engineering Bangalore ( PUBLIC UNIV. )"
 */
function parseCollegeInfo(combined: string): { code: string; name: string; city: string; type: string } {
    const match = combined.match(/^(E\d+)\s+(.+?)(?:\s+\(([^)]+)\))?$/);

    if (!match) {
        return { code: '', name: combined, city: '', type: '' };
    }

    const code = match[1];
    let name = match[2].trim();
    const typeInfo = match[3] || '';

    // Extract city from name (usually the last word before type info)
    const nameParts = name.split(/\s+/);
    let city = '';

    // Common city names in Karnataka
    const cities = ['Bangalore', 'Mysore', 'Mangalore', 'Belgaum', 'Hubli', 'Davangere', 'Tumkur', 'Gulbarga', 'Hassan', 'Shimoga'];

    for (const cityName of cities) {
        if (name.includes(cityName)) {
            city = cityName;
            break;
        }
    }

    // Determine college type
    let type = 'Private';
    if (typeInfo.includes('PUBLIC') || typeInfo.includes('UNIV') || name.includes('Government')) {
        type = 'Government';
    } else if (typeInfo.includes('AIDED') || name.includes('Aided')) {
        type = 'Aided';
    } else if (name.includes('Autonomous')) {
        type = 'Autonomous';
    }

    return { code, name, city, type };
}

/**
 * Parse course code and name
 * Example: "CS Computers" -> { code: 'CS', name: 'Computers' }
 */
function parseCourse(course: string): { code: string; name: string } {
    const match = course.match(/^([A-Z]{2,3})\s+(.+)$/);
    if (!match) {
        return { code: course, name: course };
    }
    return { code: match[1], name: match[2] };
}

/**
 * Parse CSV data and convert to Cutoff array
 */
export function parseCSVData(csvText: string): Cutoff[] {
    const lines = csvText.split('\n');
    const cutoffs: Cutoff[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line (handle quoted fields)
        const fields: string[] = [];
        let currentField = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                fields.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        fields.push(currentField.trim());

        if (fields.length < 27) continue; // Skip incomplete rows

        const collegeCodeWithName = fields[0];
        const course = fields[1];

        const collegeInfo = parseCollegeInfo(collegeCodeWithName);
        const courseInfo = parseCourse(course);

        // Process each category
        for (let catIndex = 0; catIndex < CATEGORIES.length; catIndex++) {
            const category = CATEGORIES[catIndex];
            const cutoffValue = fields[catIndex + 2]; // +2 because first two are college and course

            // Skip if no cutoff (marked as '--')
            if (!cutoffValue || cutoffValue === '--' || cutoffValue === '') {
                continue;
            }

            const cutoffRank = parseInt(cutoffValue.replace(/,/g, ''), 10);
            if (isNaN(cutoffRank)) continue;

            cutoffs.push({
                collegeCode: collegeInfo.code,
                collegeName: collegeInfo.name,
                course: course,
                courseCode: courseInfo.code,
                courseName: courseInfo.name,
                category: category,
                cutoffRank: cutoffRank,
                round: 'Round 1',
                year: 2024
            });
        }
    }

    return cutoffs;
}

/**
 * Extract unique colleges from cutoff data
 */
export function extractColleges(cutoffs: Cutoff[]): College[] {
    const collegeMap = new Map<string, College>();

    for (const cutoff of cutoffs) {
        if (!collegeMap.has(cutoff.collegeCode)) {
            // Parse college info again to get city and type
            const csvText = ''; // This would come from the original CSV
            // For now, we'll extract from the college name
            let city = '';
            let type: 'Government' | 'Aided' | 'Private' | 'Autonomous' = 'Private';

            // Extract city from name
            const cities = ['Bangalore', 'Mysore', 'Mangalore', 'Belgaum', 'Hubli', 'Davangere', 'Tumkur', 'Gulbarga', 'Hassan', 'Shimoga'];
            for (const cityName of cities) {
                if (cutoff.collegeName.includes(cityName)) {
                    city = cityName;
                    break;
                }
            }

            // Determine type
            if (cutoff.collegeName.includes('University') || cutoff.collegeName.includes('Government')) {
                type = 'Government';
            } else if (cutoff.collegeName.includes('Autonomous')) {
                type = 'Autonomous';
            }

            collegeMap.set(cutoff.collegeCode, {
                code: cutoff.collegeCode,
                name: cutoff.collegeName,
                city: city || 'Karnataka',
                type: type
            });
        }
    }

    return Array.from(collegeMap.values());
}
