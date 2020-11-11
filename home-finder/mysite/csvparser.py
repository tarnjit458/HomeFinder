#pip install mysql-connector-python
import mysql.connector
import csv
from settings import DATABASES

# Insert User Data
filename = "parser_files/Backend_user.csv"

fields = []
rows = []

with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    fields = next(csvreader)

    for row in csvreader:
        rows.append(row)

mydb = mysql.connector.connect(host=DATABASES['default']['HOST'], user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], database=DATABASES['default']['NAME'])
mycursor = mydb.cursor()

user_query = "INSERT INTO `backend_user` (`id`, `password`, `last_login`, `is_superuser`, `is_staff`, `is_active`, `first_name`, `last_name`, `address`, `city`, `state`, `zip_code`, `phone`, `email`, `date_joined`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
rows_affected = 0
for row in rows:
    mycursor.execute(user_query, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14]))
    mydb.commit()
    rows_affected += mycursor.rowcount

print(rows_affected, "records inserted into the backend_user table.")


# Insert House Data
filename = "parser_files/Backend_house.csv"

fields = []
rows = []

with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    fields = next(csvreader)

    for row in csvreader:
        rows.append(row)

house_query = "INSERT INTO `backend_house` (`id`, `address`, `city`, `state`, `zip_code`, `cost`, `description`, `for_sale`, `registered_at`, `sold`, `on_loan`, `image`, `owner_id`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
rows_affected = 0
for row in rows:
    mycursor.execute(house_query, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12]))
    mydb.commit() 
    rows_affected += mycursor.rowcount

print(rows_affected, "records inserted into the backend_house table.")