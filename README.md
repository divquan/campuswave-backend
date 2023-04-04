
# CampusWave - Backend

This is the backend for CampusWave, a platform for Ghana university students to share their experiences and insights with their peers.The backend is built with Node.js, Express, and MongoDB, and provides user authentication and image upload capabilities using Cloudinary.
It provides the RESTful API endpoints to serve the data to the frontend.




## Getting Started
### Prerequisites
- Node.js (v12 or later)
- MongoDB
- Cloudinary account and API credentials

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/divquan/campuswave-backend.git

```

2. Install the dependencies:
```bash
cd ghana-uni-blog-backend
npm install
```

3. Set up the environment variables:
Create a .env file in the root directory and add the following environment variables:

```env
PORT=5000
MONGODB_URI=<your MongoDB URI>
SECRET=<your secret key>
CLOUDINARY_CLOUD_NAME=<your Cloudinary cloud name>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>
```

4. Start the server:
```node
npm start
```



The server will be running at http://localhost:5000.
    
## API Reference

#### Authentication

`POST /api/auth/register` - Register a new user
`POST /api/auth/login` - Log in an existing user
`GET /api/auth/logout `- Log out the current user
`GET /api/auth/me` - Get the current user's profile

####Posts
`GET /api/posts `- Get all posts
`POST /api/posts` - Create a new post
`GET /api/posts/:id` - Get a specific post by ID
`PUT /api/posts/:id` - Update a specific post by ID
`DELETE /api/posts/:id` - Delete a specific post by ID

Images
`POST /api/upload` - Upload a new image to Cloudinary
## Acknowledgements

- Acknowledgements
- Node.js
- Express.js
- MySQL
- Cloudinary
- bcrypt.js
- jsonwebtoken


