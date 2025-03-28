# Setup Guide for Swasthyashe Project

This guide will help you set up and run both the frontend and backend components of the Swasthyashe project.

## Quick Start

To get started quickly, run these commands from the project root:

```bash
# Install backend dependencies and deploy
cd backend
npm install
npm install -g aws-cdk
cdk bootstrap
cdk deploy

# Install frontend dependencies and start development server
cd ../frontend
npm install
npm start
```

## Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- AWS CLI configured (for backend deployment)
- AWS CDK CLI (for backend infrastructure)

## Initial Setup

1. First, install Node.js (v14 or later) from https://nodejs.org/

2. Install AWS CLI:
   - For Windows: Download and run the installer from AWS website
   - For macOS: `brew install awscli`
   - For Linux: `sudo apt-get install awscli`

3. Configure AWS CLI with your credentials:
```bash
aws configure
```
Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

The frontend application will be available at http://localhost:3000

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Install AWS CDK globally (if not already installed):
```bash
npm install -g aws-cdk
```

4. Bootstrap AWS CDK (first time only):
```bash
cdk bootstrap
```

5. Deploy the stack:
```bash
cdk deploy
```

## Development Commands

### Frontend
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App

### Backend
- `cdk synth` - Synthesize CloudFormation template
- `cdk diff` - Show changes to be deployed
- `cdk deploy` - Deploy the stack to AWS

## Project Structure
- `/frontend` - React TypeScript frontend application
  - `/src` - Source code
    - `/components` - Reusable React components
    - `/pages` - Page components
- `/backend` - AWS CDK backend infrastructure
  - `/lib` - CDK stack definition
  - `/lambda` - Lambda function code

## Troubleshooting

### Common Issues

1. `npm install` fails
   - Try clearing npm cache: `npm cache clean --force`
   - Delete node_modules and try again: `rm -rf node_modules && npm install`

2. Frontend build fails
   - Ensure all required dependencies are installed
   - Check for Node.js version compatibility
   - Clear browser cache and reload

3. Backend deployment fails
   - Verify AWS credentials are correctly configured
   - Ensure you have sufficient AWS permissions
   - Check if AWS CDK is bootstrapped in your account/region

4. Development server issues
   - Check if port 3000 is available
   - Try running with different port: `PORT=3001 npm start`

## Development Tips

1. Frontend Development
   - Use `npm run start` for hot-reload development
   - Run tests with `npm test`
   - Format code with Prettier
   - Check console for warnings/errors

2. Backend Development
   - Use `cdk diff` to check changes before deployment
   - Local testing with `npm test`
   - Monitor AWS CloudWatch logs for issues

## Additional Notes
- Make sure you have proper AWS credentials configured before deploying the backend
- The frontend uses React Router for navigation
- The project uses Tailwind CSS for styling