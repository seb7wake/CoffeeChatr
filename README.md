# CoffeeChatr :coffee:

Welcome to ~~[CoffeeChatr](https://coffeechatr.com)~~(server no longer maintained), the platform for young professionals to brew meaningful conversations! Say goodbye to awkward silences and hello to engaging interactions. With CoffeeChatr, you can easily create coffee chatting questions, track your meetings, and save notes for each meeting. Cheers to coffee, connections, and captivating conversations!

## Getting Started Locally :ship:

1. Clone this repository with `git clone <repository-link>` and cd into the project root
2. Confirm your Python version >= 3.9.0: `python --version`
3. Confirm your yarn version >= 1.22.11: `yarn --version`
4. Confirm your PostgreSQL version >= 14: `psql --version`

### Backend Setup (Mac OS) :floppy_disk:

1. `cd coffeechatr/server` from the root project folder to move to the backend
2. Create local environment variables :closed_lock_with_key:
   1. Create a `.env` with the following contents
      ```
      POSTGRES_DB=beantalks
      DATABASE_URL=postgres://postgres:postgres@localhost:5432/beantalks
      POSTGRES_USER=postgres
      POSTGRES_PASSWORD=postgres
      POSTGRES_HOST=localhost
      POSTGRES_PORT=5432
      SECRET_KEY=
      PRODUCTION=False
      CORS_ORIGIN_WHITELIST='http://localhost:3000'
      OPENAI_API_KEY=
      ```
   2. replace SECRET_KEY and OPENAI_API_KEY with your own values
3. Set up your psql table:
   1. `brew services start postgresql` to start running postgres
   2. `psql -U postgres` to go into the postgres terminal interface
   3. `CREATE DATABASE beantalks;` to create the required database
   4. `\l` and confirm the list of returned database names includes beantalks
   5. `\q` to quit the terminal interface and retur back to `/server` directory
4. Set up your virtual environment:
   1. Installation virtualenv: `pip install virtualenv`
   2. Initialize virtual environment: `python -m venv <your-virtual-env-name>`
   3. Activate virtual environment: `source <your-virtual-env-name>/bin/activate`
5. Install requirements.txt: `pip install -r requirements.txt`
6. Migrate database: `python manage.py migrate`
7. Run server: `python manage.py runserver`

### Frontend Setup :computer:

1. `cd coffeechatr/frontend` from the root project folder to move to the frontend
2. Create an Auth0 account and follow the [Auth0 Next.js quickstart guide](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)
3. Configure local environment variables :closed_lock_with_key:
   1. Create a `.env.local` file with the following contents:
      ```
      AUTH0_SECRET=
      # The base url of your application
      AUTH0_BASE_URL='http://localhost:3000'
      # The url of your Auth0 tenant domain
      AUTH0_ISSUER_BASE_URL=
      # Your Auth0 application's Client ID
      AUTH0_CLIENT_ID=
      # Your Auth0 application's Client Secret
      AUTH0_CLIENT_SECRET=
      NEXT_PUBLIC_SERVER_URL='http://localhost:8000'
      ```
   2. Replace the blank values with our Auth0 application info
4. Install dependencies: `yarn`
5. Start server with Next.js: `yarn dev`
6. Go to http://localhost:3000 and sign up for free :chart_with_upwards_trend:
