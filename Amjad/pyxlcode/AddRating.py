
#from openpyxl import load_workbook
#import pandas
#
#dataset = pandas.read_csv('rating.csv')
#
#print(dataset)
#
#fields=[[9999,9999,9999]]
#df = pandas.DataFrame(fields, columns = ["event-id","rating","user-id"])
#dataset = dataset.append(fields, ignore_index = True )
#print(dataset)

import pandas as pd 
  
# Creating the first Dataframe using dictionary 
df1 = pd.read_csv('rating.csv')
  
# Creating the Second Dataframe using dictionary 
df2 = pd.DataFrame({"user-id":[9998], 
                    "event-id":[9998],  
                    "rating":[1]}) 
  
# for appending df2 at the end of df1 
df = df1.append(df2, ignore_index = True) 
print(df)
df.to_csv('rating.csv', index = False) 