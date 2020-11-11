# Backend Setup

pip install django djangorestframework django-cors-headers stripe mysql-connector-python

python manage.py runserver

# Configuring the database

- Make sure pycache folder is empty
- Make sure migrations folder only has an empty init python file
- Make sure all the tables in the database are dropped(empty)
- Make sure to add your local database password into the settings.py file in the mysite folder

# Adding test data into your local database

- Go to the mysite folder
- run python csvparser.py
