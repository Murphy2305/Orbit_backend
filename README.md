# Environment Variables Setup

This project requires the following environment variables to be configured:

### Required Variables

1. PORT
   - Description: Specifies the port on which the server will run.
   - Example: `3000`

2. **MONGO_URI**
   - Description: The connection string for your MongoDB database.
   - Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<databaseName>?retryWrites=true&w=majority`

### How to Set Up Environment Variables

1. Create a `.env` file in the root directory of your project if it doesn't already exist.
2. Add the following lines to the `.env` file, replacing the placeholders with your actual values:

```env
PORT=<PortNumber>
MONGO_URI=<MongodbURL>
```

 Example `.env` File

```env
PORT=3000
MONGO_URI=mongodb+srv://user123:password123@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

 Security Note

- Never commit your `.env` file to version control (e.g., GitHub). Use a `.gitignore` file to exclude it.
- Ensure sensitive information such as database credentials is stored securely.

