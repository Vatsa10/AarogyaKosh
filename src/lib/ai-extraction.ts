import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { z } from 'zod';
import { PrescriptionExtraction, LabReportExtraction, Medicine, LabValue } from '@/types';

// Initialize OpenAI client (you'll need to set OPENAI_API_KEY in .env)
const model = openai('gpt-4-vision-preview');

// Zod schemas for type safety
const medicineSchema = z.object({
  name: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration_days: z.number()
});

const labValueSchema = z.object({
  name: z.string(),
  value: z.number(),
  reference_range: z.string(),
  status: z.enum(['low', 'normal', 'high'])
});

const prescriptionExtractionSchema = z.object({
  doctor: z.string(),
  date: z.string(),
  diagnosis: z.string(),
  medicines: z.array(medicineSchema),
  follow_up_date: z.string().nullable()
});

const labReportExtractionSchema = z.object({
  test_name: z.string(),
  date: z.string(),
  values: z.array(labValueSchema)
});

export async function extractPrescriptionData(imageBase64: string): Promise<PrescriptionExtraction> {
  try {
    const result = await generateText({
      model,
      messages: [
        {
          role: 'user' as const,
          content: [
            {
              type: 'text' as const,
              text: `Extract medical information from this prescription image and return a JSON object with:
              - doctor: Doctor's name (string)
              - date: Date of prescription (string in YYYY-MM-DD format)
              - diagnosis: Diagnosis or notes (string)
              - medicines: Array of objects with name, dosage, frequency, duration_days
              - follow_up_date: Follow-up date if mentioned (string or null)
              
              Be precise and only extract information that is clearly visible. Return valid JSON only.`,
            },
            {
              type: 'image' as const,
              image: imageBase64,
            },
          ],
        },
      ],
    });

    // Parse the JSON response
    const parsed = JSON.parse(result.text);
    return prescriptionExtractionSchema.parse(parsed) as PrescriptionExtraction;
  } catch (error) {
    console.error('Error extracting prescription data:', error);
    throw new Error('Failed to extract prescription data');
  }
}

export async function extractLabReportData(imageBase64: string): Promise<LabReportExtraction> {
  try {
    const result = await generateText({
      model,
      messages: [
        {
          role: 'user' as const,
          content: [
            {
              type: 'text' as const,
              text: `Extract lab test information from this report and return a JSON object with:
              - test_name: Test name (e.g., CBC, LFT, KFT, Lipid Profile, Thyroid, Vitamin D)
              - date: Date of report (string in YYYY-MM-DD format)
              - values: Array of objects with name, value, reference_range, status
              
              For status determination:
              - Mark as "high" if value exceeds upper reference range
              - Mark as "low" if value below lower reference range  
              - Mark as "normal" if within reference range
              
              Be precise with numeric values and reference ranges. Return valid JSON only.`,
            },
            {
              type: 'image' as const,
              image: imageBase64,
            },
          ],
        },
      ],
    });

    // Parse the JSON response
    const parsed = JSON.parse(result.text);
    return labReportExtractionSchema.parse(parsed) as LabReportExtraction;
  } catch (error) {
    console.error('Error extracting lab report data:', error);
    throw new Error('Failed to extract lab report data');
  }
}

// Fallback function for when AI is not available
export function mockPrescriptionExtraction(): PrescriptionExtraction {
  return {
    doctor: 'Dr. Sharma',
    date: '2024-01-15',
    diagnosis: 'Hypertension and Acid Reflux',
    medicines: [
      {
        name: 'Omeprazole',
        dosage: '20mg',
        frequency: 'Once daily before breakfast',
        duration_days: 14
      },
      {
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily after dinner',
        duration_days: 30
      }
    ],
    follow_up_date: '2024-02-15'
  };
}

export function mockLabReportExtraction(): LabReportExtraction {
  return {
    test_name: 'Complete Blood Count (CBC)',
    date: '2024-01-10',
    values: [
      {
        name: 'Hemoglobin',
        value: 14.5,
        reference_range: '13.5-17.5 g/dL',
        status: 'normal'
      },
      {
        name: 'WBC Count',
        value: 6800,
        reference_range: '4000-11000 cells/μL',
        status: 'normal'
      },
      {
        name: 'Platelet Count',
        value: 280000,
        reference_range: '150000-450000 cells/μL',
        status: 'normal'
      },
      {
        name: 'RBC Count',
        value: 4.8,
        reference_range: '4.5-5.9 million/μL',
        status: 'normal'
      }
    ]
  };
}
