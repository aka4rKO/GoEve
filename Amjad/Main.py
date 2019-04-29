# -*- coding: utf-8 -*-
"""
Created on Mon Apr 29 17:58:33 2019

@author: Amjad
"""

from flask import Flask, request
import RBMBakeOff

#from RBMBakeOff import TrainModel

app = Flask(__name__)
print(app)

@app.route("/")
def home():
    return "Hello World"

@app.route("/train")
def train():
#    TrainModel()
    RBMBakeOff.TrainModel()
    return "Hello"

# Running the server in localhost:5000    
if __name__ == '__main__':
    app.run(debug=True)
    
    
    


