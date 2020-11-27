#pip install mysql-connector-python
import mysql.connector
#pip install requests
import requests
import csv
from settings import DATABASES

mydb = mysql.connector.connect(host=DATABASES['default']['HOST'], user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], database=DATABASES['default']['NAME'])
mycursor = mydb.cursor()

# Insert User Data
url = "http://127.0.0.1:8000/api/user_register/"
users = [{'role':'User',
        'email':'john.doe@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'John',
        'last_name':'Doe',
        'address':'1610 Reeves Street',
        'city':'Sheboygan Falls',
        'state':'WI',
        'zip_code':'53085',
        'phone':'920-808-7890'},
        {'role':'User',
        'email':'mary.short@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Mary',
        'last_name':'Short',
        'address':'133 Small Street',
        'city':'BOYNTON BEACH',
        'state':'FL',
        'zip_code':'33436',
        'phone':'212-804-6463'},
        {'role':'User',
        'email':'bobby.caulfield@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Bobby',
        'last_name':'Caulfield',
        'address':'3981 Locust View Drive',
        'city':'BEAR LAKE',
        'state':'PA',
        'zip_code':'16402',
        'phone':'415-998-1873'},
        {'role':'Administrator',
        'email':'james.perry@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'James',
        'last_name':'Perry',
        'address':'3319 Rardin Drive',
        'city':'Redwood City',
        'state':'CA',
        'zip_code':'94063',
        'phone':'650-701-8396'},
        {'role':'Administrator',
        'email':'kenneth.edwards@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Kenneth',
        'last_name':'Edwards',
        'address':'1221 Dogwood Lane',
        'city':'Green Valley',
        'state':'AZ',
        'zip_code':'85614',
        'phone':'520-648-8868'},
        {'role':'Administrator',
        'email':'anthony.mayberry@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Anthony',
        'last_name':'Mayberry',
        'address':'1480 Granville Lane',
        'city':'Newark',
        'state':'NJ',
        'zip_code':'07104',
        'phone':'973-481-4509'},
        {'role':'Realtor',
        'email':'elizabeth.sanders@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Elizabeth',
        'last_name':'Sanders',
        'address':'63 Gordon Street',
        'city':'Rialto',
        'state':'CA',
        'zip_code':'92376',
        'phone':'909-562-2114'},
        {'role':'Realtor',
        'email':'charles.hornsby@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Charles',
        'last_name':'Hornsby',
        'address':'718 Hickory Ridge Drive',
        'city':'Las Vegas',
        'state':'NV',
        'zip_code':'89109',
        'phone':'702-650-1374'},
        {'role':'Realtor',
        'email':'martha.randell@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Martha',
        'last_name':'Randell',
        'address':'3670 Pennsylvania Avenue',
        'city':'Piscataway',
        'state':'NJ',
        'zip_code':'08854',
        'phone':'732-336-4204'},
        {'role':'Landlord',
        'email':'david.adams@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'David',
        'last_name':'Adams',
        'address':'4495 Platinum Drive',
        'city':'Pittsburgh',
        'state':'PA',
        'zip_code':'15212',
        'phone':'724-784-2974'},
        {'role':'Landlord',
        'email':'annie.easley@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Annie',
        'last_name':'Easley',
        'address':'2830 Veltri Drive',
        'city':'Green Bay',
        'state':'MI',
        'zip_code':'54303',
        'phone':'906-929-6059'},
        {'role':'Landlord',
        'email':'norma.delacruz@gmail.com',
        'password':'password',
        'password2':'password',
        'first_name':'Norma',
        'last_name':'Delacruz',
        'address':'2521 Glen Falls Road',
        'city':'Philadelphia',
        'state':'PA',
        'zip_code':'19153',
        'phone':'215-863-5912'}
        ]

for user in users:
    r = requests.post(url = url, data = user)
    pastebin_url = r.text
    print("\n%s"%pastebin_url)



# Insert House Data
filename = "parser_files/Backend_house.csv"

fields = []
rows = []

with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    fields = next(csvreader)

    for row in csvreader:
        rows.append(row)

house_query = "INSERT INTO `backend_house` (`id`, `address`, `city`, `state`, `zip_code`, `sqft`, `bedrooms`, `bathrooms`, `flooring`, `parking`, `year_built`, `cost`, `description`, `for_sale`, `registered_at`, `updated_at`,`sold`, `on_loan`, `image`, `owner_id`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
rows_affected = 0
for row in rows:
    mycursor.execute(house_query, (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19]))
    mydb.commit() 
    rows_affected += mycursor.rowcount

print(rows_affected, "records inserted into the backend_house table.")
