# Backend Setup

pip install django djangorestframework django-cors-headers stripe mysql-connector-python

python manage.py runserver

# Configuring the database

- Make sure pycache folder is empty
- Make sure migrations folder only has an empty init python file
- Make sure all the tables in the database are dropped(empty)
- Make sure to add your local database password into the settings.py file in the mysite folder

# Adding test data into your local database

- Run pip install requests

Two open terminals required

- 1. In one terminal go to home-finder/mysite/ and run the drop_all_tables.py file
- 2. In the second terminal, go to home-finder/ and run manage.py migrate
- 3. In the second terminal, run python manage.py runserver
- 4. In the first terminal, run python csvparser.py
