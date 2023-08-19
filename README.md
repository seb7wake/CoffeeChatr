# CoffeeChatr

Welcome to CoffeeChatr, the platform for young professionals to brew meaningful conversations! Say goodbye to awkward silences and hello to engaging interactions. With BeanTalks, you can easily create coffee chatting questions, track your meetings, and save notes for each meeting. Cheers to coffee, connections, and captivating conversations!

## Getting Started Locally :ship:

1. Clone this repository with `git clone <repository-link>` and cd into the project root
2. Confirm your Python version >= 3.9.0: `python --version`
3. Confirm your yarn version >= 1.22.11: `yarn --version`
4. Confirm your PostgreSQL version >= 14: `psql --version`

### Backend Setup (Mac OS) :floppy_disk:

1. `cd coffeechatr/server` from the root project folder to move to the backend
2. Set up your psql table:
   1. `brew services start postgresql` to start running postgres
   2. `psql -U postgres` to go into the postgres terminal interface
   3. `CREATE DATABASE beantalks;` to create the required database
   4. `\l` and confirm the list of returned database names includes beantalks
   5. `\q` to quit the terminal interface and retur back to `/server` directory
3. Set up your virtual environment:
   1. Installation virtualenv: `pip install virtualenv`
   2. Initialize virtual environment: `python -m venv <your-virtual-env-name>`
   3. Activate virtual environment: `source <your-virtual-env-name>/bin/activate`
4. Install requirements.txt: `pip install -r requirements.txt`
5. Migrate database: `python manage.py migrate`
6. Run server: `python manage.py runserver`

### Frontend Setup :computer:

1. `cd coffeechatr/frontend` from the root project folder to move to the frontend
2. Install dependencies: `yarn`
3. Start server with Next.js: `yarn dev`
4. Go to http://localhost:3000 and sign up for free :chart_with_upwards_trend:
