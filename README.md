# Serverless Todo Application

A full-stack serverless todo application built with AWS CDK, featuring React frontend, Cognito authentication, Lambda API, and DynamoDB storage.

## Architecture

- **Frontend**: React TypeScript with Vite, hosted on S3 + CloudFront
- **Authentication**: AWS Cognito User Pool with hosted UI
- **API**: AWS Lambda with API Gateway
- **Database**: DynamoDB
- **Infrastructure**: AWS CDK (TypeScript)

## Features

- ✅ User authentication with AWS Cognito
- ✅ Create, read, update, delete todos
- ✅ Secure API with JWT authorization
- ✅ Responsive React UI
- ✅ SSL/HTTPS enforcement
- ✅ CloudFront CDN distribution
- ✅ Infrastructure as Code with CDK

## Project Structure

```
├── bin/                    # CDK app entry point
├── lib/                    # CDK stack definitions
├── lambda/                 # Lambda function code
├── frontend/               # React application
│   ├── src/
│   ├── dist/              # Built frontend assets
│   └── package.json
├── cdk.out/               # CDK synthesized output
├── build-and-deploy.sh    # Deployment script
└── package.json           # CDK dependencies
```

## Prerequisites

- Node.js 18+
- AWS CLI configured
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Build and deploy**:
   ```bash
   ./build-and-deploy.sh
   ```

3. **Access the application**:
   - The CloudFront URL will be displayed after deployment
   - Sign up/sign in using the Cognito authentication

## Manual Deployment

### 1. Build Frontend
```bash
cd frontend
npm run build
cd ..
```

### 2. Deploy Infrastructure
```bash
npm run build
npx cdk deploy
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### CDK Commands
- `npm run build` - Compile TypeScript
- `npm run watch` - Watch for changes
- `npx cdk diff` - Compare deployed stack with current state
- `npx cdk synth` - Emit synthesized CloudFormation template

## Configuration

The application automatically configures AWS Amplify during deployment. Configuration is generated dynamically and deployed to S3.

### Environment Variables
- `TODOS_TABLE` - DynamoDB table name (set automatically)

## Security Features

- **S3 Security**: Block all public access, SSL enforcement
- **CloudFront**: HTTPS redirect, Origin Access Control (OAC)
- **API Gateway**: Cognito User Pool authorizer
- **DynamoDB**: User-scoped data access

## API Endpoints

- `GET /todos` - List user's todos
- `POST /todos` - Create new todo
- `PUT /todos` - Update existing todo
- `DELETE /todos/{id}` - Delete todo

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- AWS Amplify v6
- AWS Amplify UI React

### Backend
- AWS Lambda (Python 3.12)
- API Gateway
- DynamoDB
- Cognito User Pool

### Infrastructure
- AWS CDK v2
- CloudFormation
- S3
- CloudFront

## Cleanup

To remove all resources:
```bash
npx cdk destroy
```

## Troubleshooting

### Common Issues

1. **Build fails**: Ensure Node.js 18+ and all dependencies installed
2. **Deployment fails**: Check AWS credentials and permissions
3. **Authentication issues**: Verify Cognito User Pool configuration
4. **API errors**: Check Lambda logs in CloudWatch

### Useful Commands

```bash
# View CDK diff
npx cdk diff

# Check CloudFormation events
aws cloudformation describe-stack-events --stack-name S3StaticStack

# View Lambda logs
aws logs tail /aws/lambda/S3StaticStack-TodosFunction --follow
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details
