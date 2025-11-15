# MongoDB Setup Guide for GreenVue

## Option 1: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install MongoDB with default settings
3. MongoDB will run on `mongodb://localhost:27017` by default

### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to https://www.mongodb.com/atlas
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address
6. Get your connection string
7. Update your `.env` file with the Atlas connection string

Example Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenvue
```

## Setup Instructions

1. **Copy environment file:**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update .env file:**
   - For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/greenvue`
   - For Atlas: Use your Atlas connection string

4. **Start the server:**
   ```bash
   npm run dev
   ```

## Verify Setup

1. Check server logs for "✅ MongoDB connected successfully"
2. Visit `http://localhost:5002/api/health` to check database status
3. Visit `http://localhost:5002/api/esg-funds` to see sample data

## Database Collections

The server will automatically create these collections:
- `esgfunds` - ESG investment funds
- `news` - News articles
- `contacts` - Contact form submissions
- `newsletters` - Newsletter subscriptions

## Sample Data

The server automatically initializes with sample data:
- 5 ESG funds with different types and ratings
- 3 news articles about sustainable investing
- All data includes proper timestamps and metadata

## MongoDB Tools (Optional)

- **MongoDB Compass**: GUI for MongoDB (https://www.mongodb.com/products/compass)
- **MongoDB Shell**: Command-line interface included with MongoDB

## Troubleshooting

### Connection Issues:
- Ensure MongoDB service is running
- Check firewall settings
- Verify connection string in .env file

### Atlas Issues:
- Check IP whitelist
- Verify username/password
- Ensure cluster is active

### Data Issues:
- Check server logs for detailed error messages
- Verify MongoDB has write permissions
- Check disk space for local installations