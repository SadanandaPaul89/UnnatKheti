import { NextRequest, NextResponse } from 'next/server';
import * as ee from '@google/earthengine';

// Initialize Earth Engine with your project ID
const PROJECT_ID = process.env.EE_PROJECT_ID || 'your-earth-engine-project-id';

// Authenticate and initialize Earth Engine
async function initializeEarthEngine() {
  try {
    // Check environment variables
    const privateKey = process.env.EE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const serviceAccount = process.env.EE_SERVICE_ACCOUNT;
    const projectId = process.env.EE_PROJECT_ID;

    if (!privateKey || !serviceAccount || !projectId) {
      throw new Error('Missing required environment variables: EE_PRIVATE_KEY, EE_SERVICE_ACCOUNT, EE_PROJECT_ID');
    }

    // Authenticate with service account
    await new Promise<void>((resolve, reject) => {
      ee.data.authenticateViaPrivateKey({
        privateKey: privateKey,
        service_account: serviceAccount,
      }, (success: any) => {
        console.log('Earth Engine authentication successful');
        resolve();
      }, (error: any) => {
        console.error('Earth Engine authentication failed:', error);
        reject(new Error(`Authentication failed: ${error?.message || 'Unknown error'}`));
      });
    });

    // Initialize Earth Engine with project ID
    await new Promise<void>((resolve, reject) => {
      ee.initialize(projectId, null, () => {
        console.log('Earth Engine initialized successfully');
        resolve();
      }, (error: any) => {
        console.error('Earth Engine initialization failed:', error);
        reject(new Error(`Initialization failed: ${error?.message || 'Unknown error'}`));
      });
    });

    return true;
  } catch (error) {
    console.error('Failed to initialize Earth Engine:', error);
    throw error;
  }
}

// Test Earth Engine authentication
async function testEarthEngineAuth() {
  try {
    // Simple test: get the list of available datasets (this requires auth)
    const datasets = await ee.data.getList({ id: 'projects/earthengine-public/assets/LANDSAT' });
    return {
      success: true,
      message: 'Authentication successful',
      data: { datasetsCount: datasets?.length || 0 }
    };
  } catch (error) {
    console.error('Authentication test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
}

// Example Earth Engine operation: Get information about a dataset
async function getEarthEngineData() {
  try {
    // Example: Get metadata for a Landsat image collection
    const collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
    const image = collection.first();
    const info = await image.getInfo();

    return {
      success: true,
      data: {
        imageId: info.id,
        bands: info.bands?.map((band: any) => band.id) || [],
        properties: info.properties
      }
    };
  } catch (error) {
    console.error('Error fetching Earth Engine data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Initialize Earth Engine
    await initializeEarthEngine();

    // Test authentication first
    const authTest = await testEarthEngineAuth();
    if (!authTest.success) {
      return NextResponse.json(authTest, { status: 401 });
    }

    // Perform Earth Engine operation
    const result = await getEarthEngineData();

    return NextResponse.json(result);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// You can add other HTTP methods as needed
export async function POST(request: NextRequest) {
  // Handle POST requests for more complex Earth Engine operations
  return NextResponse.json({ message: 'POST method not implemented yet' });
}
