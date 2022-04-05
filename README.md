### Overview

The codes are based on a simple MERN application called “Our Places”.

Additional Features
- enable users to add Place Type on the "Add Place" form
- Add a new page to list all place post (pagination is included). 


### Environment Variables
- GOOGLE_API_TOKEN
- connection string of mongodb

### Dev Environment (locally)
The dev environment is using `concurrently`.

- install  `concurrently`
    `npm install -D concurrently`

- change image uploads path (backend) from `uploads/images` to `backend/uploads/images`

- install modules of frontend 
    ``` bash
    cd frontend
    npm install
    ```

- install modules of backend 
    ``` bash
    cd backend
    npm install
    ```

- add `.env` in root folder (this is only for dev)
- add `.gitignore` in root folder 
- add and modify `package.json` in root folder
  ```json
  "scripts": {
    "dev": "concurrently \"npm start --prefix frontend\" \"nodemon backend/app.js\"",
    }
  ```
- run dev envoriment
     `mpn run dev`

### testing

testing is included with `jest` and `@testing-library`

example testing file: `src/shared/components/FormElements/DropDown.test.js`

test frontend:
```bash
cd frontend
npm run test
```


### Deployment (heroku)

1. modify `package.json` in root path
   ```json
   "scripts": {
    "dev": "concurrently \"npm start --prefix frontend\" \"nodemon backend/app.js\"",
    "frontend": "cd frontend && npm install  && npm run build",
    "backend": "cd backend && npm install",
    "start": "node backend/app.js",
    "heroku-postbuild": "npm run frontend && npm run backend"
   }
   ```
2. modify api cal url from `http://localhost:5000` to url of `heroku` application
3. modify `backend/app.js`, add the following
   ```javascript
   app.use(express.static(path.resolve(__dirname, '../frontend/build')));
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
   });
   ```
4. change port to 443
5. add environment variables (mongodb link and goole map api)



other deployment option: `docker-compose`
