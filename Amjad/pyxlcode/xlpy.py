
from openpyxl import load_workbook
import pandas

dataset = pandas.read_csv('rating.csv')

print(dataset)

fields=[[9999,9999,9999]]
df = pandas.DataFrame(fields, columns = ["event-id","rating","user-id"])
dataset = dataset.append(fields, ignore_index = True )
print(dataset)