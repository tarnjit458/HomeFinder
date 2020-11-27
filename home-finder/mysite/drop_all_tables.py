#pip install mysql-connector-python
import mysql.connector
import csv
from settings import DATABASES


mydb = mysql.connector.connect(host=DATABASES['default']['HOST'], user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], database=DATABASES['default']['NAME'])
mycursor = mydb.cursor()

mycursor.execute("DROP TABLE `home_finder`.`django_migrations`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`django_session`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`auth_group_permissions`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`authtoken_token`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_application`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_schedule`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`django_admin_log`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_user_groups`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_user_user_permissions`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`auth_permission`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`auth_group`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`django_content_type`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_favorite`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_house`")
mydb.commit()

mycursor.execute("DROP TABLE `home_finder`.`backend_user`")
mydb.commit()